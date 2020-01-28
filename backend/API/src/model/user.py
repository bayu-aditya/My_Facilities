from src.model.mysql import Database


class UserModels:
    def __init__(self, username, password):
        self.username = username
        self.password = password

    @classmethod
    def find_by_username(cls, username):
        db = Database()
        try:
            result = db.execute(
                "SELECT username, password FROM user WHERE username=%s", (username,)
                ).fetchone()
            if result:
                return cls(*result)
            else:
                return None
        except:
            return {"message": "Something wrong in server."}, 500