import React from 'react';
import { connect } from 'react-redux';
import { MenuItem } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { organization_api, inventory_api, task_api } from '../api/link.js';
import { fetchDelTask } from '../action';

function mapStateToProps(state) {
    return {
        access_token: state.access_token,
    }
}

class Del_organization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialog: false,
        };
        this.id = this.props.id_org;
        this.name = this.props.name_org;
        this.url = organization_api();
    }
    openDeleteDialog = (e) => {
        this.setState({dialog: true})
    }
    deleteHandler = () => {
        let url = this.url;
        let self = this;
        let body = {"_id": this.id};
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 202) {
                    let resp = JSON.parse(this.responseText);
                    console.log(resp);
                    self.closeDeleteDialog();
                    window.location.reload();
                }
            }
        }
        xhr.open("DELETE", url);
        xhr.setRequestHeader("Authorization", "Bearer "+this.props.access_token);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(body))
    }
    closeDeleteDialog = () => {
        this.setState({dialog: false})
    }
    deleteDialog = () => (
        <div>
            <Dialog
            open={this.state.dialog}
            onClose={this.closeDeleteDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">Delete {this.name}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure want to delete this organization ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.closeDeleteDialog} color="primary">
                Disagree
                </Button>
                <Button onClick={this.deleteHandler} color="primary" autoFocus>
                Agree
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    )
    render() {
        return (
            <div>
                {this.deleteDialog()}
                <MenuItem onClick={this.openDeleteDialog}>
                    <DeleteIcon fontSize="small"  color="secondary" />
                    Delete
                </MenuItem>
            </div>
        )
    }
}

class Del_inventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialog: false
        };
        this.id_org = this.props.id_org;
        this.id_inv = this.props.id_inv;
        this.name_inv = this.props.name_inv;
        this.url = inventory_api();
    }
    openDeleteDialog = (e) => {
        this.setState({dialog: true})
    }
    deleteHandler = () => {
        let url = this.url;
        let self = this;
        let body = {
            "_id_org": this.id_org,
            "_id": this.id_inv
        };
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 202) {
                    let resp = JSON.parse(this.responseText);
                    console.log(resp);
                    self.closeDeleteDialog();
                    window.location.reload();
                }
            }
        }
        xhr.open("DELETE", url);
        xhr.setRequestHeader("Authorization", "Bearer "+this.props.access_token);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(body))
        console.log(body)
        console.log(this.access_token)
    }
    closeDeleteDialog = () => {
        this.setState({dialog: false})
    }
    deleteDialog = () => (
        <div>
            <Dialog
            open={this.state.dialog}
            onClose={this.closeDeleteDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">Delete {this.name_inv}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure want to delete this inventory ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.closeDeleteDialog} color="primary">
                Disagree
                </Button>
                <Button onClick={this.deleteHandler} color="primary" autoFocus>
                Agree
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    )
    render() {
        return (
            <div>
                {this.deleteDialog()}
                <MenuItem onClick={this.openDeleteDialog}>
                    <DeleteIcon fontSize="small" color="secondary" />
                    Delete
                </MenuItem>
            </div>
        )
    }
}

class Del_task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialog: false
        };
        this.id_org = this.props.id_org;
        this.id_inv = this.props.id_inv;
        this.id_task = this.props.id_task;
        this.url = task_api();
        this.body = {};
    }
    openDeleteDialog = () => {
        this.setState({dialog: true})
    }
    deleteHandler = () => {
        this.body = {
            // "_id_org": this.id_org,
            // "_id_inv": this.id_inv,
            "id_task": this.id_task,
        };
        this.props.dispatch(fetchDelTask(this));
    }
    closeDeleteDialog = () => {
        this.setState({dialog: false})
    }
    deleteDialog = () => (
        <div>
            <Dialog
            open={this.state.dialog}
            onClose={this.closeDeleteDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure want to delete this task ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.closeDeleteDialog} color="primary">
                Disagree
                </Button>
                <Button onClick={this.deleteHandler} color="primary" autoFocus>
                Agree
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    )
    render() {
        return (
            <div>
                {this.deleteDialog()}
                <MenuItem onClick={this.openDeleteDialog}>
                    <DeleteIcon fontSize="small" color="secondary" />
                    Delete
                </MenuItem>
            </div>
        )
    }
}

const Delete_organization = connect(mapStateToProps)(Del_organization);
const Delete_inventory = connect(mapStateToProps)(Del_inventory);
const Delete_task = connect(mapStateToProps)(Del_task);

export {Delete_organization};
export {Delete_inventory};
export {Delete_task};