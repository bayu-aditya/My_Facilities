import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, ListSubheader } from '@material-ui/core';
import { get_cookie } from '../../../action/cookie';
import Loading from '../../../component/loading';

function retrieveAPI(that) {
    let url = that.url+"?_id="+that.id_org;
    let self = that;
    console.log(url);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 202) {
                let resp = JSON.parse(this.responseText);
                console.log(resp);
                self.setState({
                    isLoad: false,
                    members: resp["members"]
                })
            }
        }
    }
    xhr.open("GET", url);
    xhr.setRequestHeader('Authorization', 'Bearer '+self.state.access_token);
    xhr.send();
}

export class List_Member extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            access_token: this.props.access_token,
            isLoad: true,
            members: []
        };
        this.id_org = get_cookie("_id_org");
        this.admin = "admin123";
        this.image = "https://www.w3schools.com/howto/img_avatar.png";
        this.url = "http://0.0.0.0:8888/organization/members";
    }
    componentDidUpdate() {
        if (this.state.isLoad === true) {
            let update_access_token = this.props.access_token;
            if (update_access_token !== this.state.access_token) {
                this.setState({access_token: update_access_token});
            } else {
                retrieveAPI(this);
            }
        }
    }
    bodyList() {
        if (this.state.isLoad === true) {
            return <Loading />
        } else {
            if (this.state.members.length === 0) {
                return <span>No members</span>
            } else {
                return (
                    <div>
                        {this.state.members.map(
                            (data, index) => {
                                let username = data;
                                return (
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar 
                                            src="https://www.w3schools.com/howto/img_avatar.png" />
                                        </ListItemAvatar>
                                        <ListItemText primary={username} />
                                    </ListItem>
                                )
                            })}
                    </div>
                )
            }
        }
    }
    render() {
        return (
            <div>
                <List 
                subheader={<ListSubheader>Admin</ListSubheader>} >
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar 
                            src="https://www.w3schools.com/howto/img_avatar.png" />
                        </ListItemAvatar>
                        <ListItemText primary={this.admin} />
                    </ListItem>
                </List>
                <List subheader={<ListSubheader>Members</ListSubheader>} >
                    {this.bodyList()}
                </List>
            </div>
        )
    }
}