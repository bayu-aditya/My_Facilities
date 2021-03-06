import React from 'react';
import { 
    List, 
    ListItem, 
    ListItemText, 
    ListItemAvatar, 
    Avatar, 
    ListSubheader, 
    ListItemSecondaryAction } from '@material-ui/core';
import Loading from '../../component/loading';
import { members_api } from '../../api/link.js';
import { connect } from 'react-redux';
import { Delete_member } from '../../component/deleting';
import { fetchMemberOrganization } from '../../action';

function mapStateToProps(state) {
    return {
        id_org: state.id_org,
    }
}

class List_Member extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoad: true,
            admin: null,
            members: []
        };
        this.id_org = this.props.id_org;
        this.image = "https://www.w3schools.com/howto/img_avatar.png";
        this.url = members_api();
    }
    componentDidMount() {
        this.props.dispatch(fetchMemberOrganization(this));
    }
    bodyList() {
        if (this.state.members.length === 0) {
            return <span>No members</span>
        } else {
            return (
                <div>
                    {this.state.members.map(
                        (data, index) => {
                            let username = data;
                            return (
                                <ListItem key={index}>
                                    <ListItemAvatar>
                                        <Avatar 
                                        src="https://www.w3schools.com/howto/img_avatar.png" />
                                    </ListItemAvatar>
                                    <ListItemText primary={username} />
                                    <ListItemSecondaryAction>
                                        <Delete_member username={username} />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })}
                </div>
            )
        }
    }
    render() {
        if (this.state.isLoad === true) {
            return <Loading />
        } else {
            return (
                <div>
                    <List 
                    subheader={<ListSubheader>Administrator</ListSubheader>} >
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar 
                                src="https://www.w3schools.com/howto/img_avatar.png" />
                            </ListItemAvatar>
                            <ListItemText primary={this.state.admin} />
                        </ListItem>
                    </List>
                    <List subheader={<ListSubheader>Members</ListSubheader>} >
                        {this.bodyList()}
                    </List>
                </div>
            )
        }
    }
}

export default connect(mapStateToProps)(List_Member);