from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity

from src.model.mysql import Database
from src.model.user import UserModels
from src.model.organization import Org

class Tasks(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(name="id_org", type=str, required=True, help="id organization cannot be blank.")
    parser.add_argument(name="id_inv", type=str, required=True, help="id inventory cannot be blank.")

    def get(self):
        inpt = self.parser.parse_args()
        try:
            org = Org.find_by_id(inpt["id_org"])
            db = Database()
            result = db.execute(
                "SELECT id, username, start, finish, notes FROM timeline WHERE id_organization=%s AND id_inventory=%s", 
                (inpt["id_org"], inpt["id_inv"])
            )
            data = list()
            for i in result:
                user = UserModels.find_by_username(i[1])
                row = {
                    "id_task": i[0],
                    "username": i[1],
                    "name": user.name,
                    "color": org.get_color_from_username(i[1]),
                    "start": i[2],
                    "finish": i[3],
                    "note": i[4]
                }
                data.append(row)
            return {"tasks": data}, 202
        except: 
            return {"message": "Something wrong in server."}, 500

class Task(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(name="id_org", type=str, required=True, help="id organization cannot be blank.")
    parser.add_argument(name="id_inv", type=str, required=True, help="id inventory cannot be blank.")
    parser.add_argument(name="start", type=int, required=True, help="start date cannot be blank.")
    parser.add_argument(name="finish", type=int, required=True, help="finish date cannot be blank.")
    parser.add_argument(name="note", type=str, help="notes cannot be blank.")

    parser_del = reqparse.RequestParser()
    parser_del.add_argument(name="id_task", type=str, required=True, help="id task cannot be blank.")

    @jwt_required
    def post(self):
        try:
            inpt = self.parser.parse_args()

            if (inpt["start"] > inpt["finish"]):
                return {"message": "finish time must be greater than start time"}, 403

            # Kasih Exception kalau tasknya gaboleh nabrak antar satu sama yang lain

            username = get_jwt_identity()
            db = Database()
            db.execute(
                "INSERT INTO timeline (id_organization, id_inventory, username, start, finish, notes) VALUES (%s, %s, %s, %s, %s, %s)",
                (inpt["id_org"], inpt["id_inv"], username, inpt["start"], inpt["finish"], inpt["note"])
            )
            db.commit()
            return {"message": "task has been created."}, 202
        except:
            return {"message": "something wrong in server"}, 500

    def put(self):
        pass

    def delete(self):
        inpt = self.parser_del.parse_args()
        db = Database()
        db.execute(
            "DELETE FROM timeline WHERE id=%s", (inpt["id_task"],)
        )
        db.commit()
        return {"message": "task has been deleted"}, 202
