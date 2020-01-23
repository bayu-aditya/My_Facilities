import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import { DialogTitle, DialogContent, TextField, withStyles } from '@material-ui/core';

import { get_cookie } from '../action/cookie';

var url = "http://0.0.0.0:8888/organization";

const useStyles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 500
        }
    }
});

class Adding_org extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name: null,
            desc: null
        };
        this.access_token = this.props.access_token;
        this.url = "http://0.0.0.0:8888/organization";
    }

    handleOpen = () => {
        this.setState({open: true})
    }
    handleClose = () => {
        this.setState({open: false})
    }
    changeHandler = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }
    submitHandler = (event) => {
        event.preventDefault();
        console.log("submitted Form:");
        let url = this.url;
        let body = {
            "name": this.state.name,
            "desc": this.state.desc
        }
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 202) {
                let resp = JSON.parse(this.responseText);
                console.log(resp);
            }
        }
        xhr.open("POST", url);
        xhr.setRequestHeader('Authorization', 'Bearer '+this.access_token);
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(body))
        this.handleClose();
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button size="small" color="primary" variant="contained" aria-label="add" onClick={this.handleOpen} disableElevation>
                    <AddIcon />Adding
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} className={classes.root}>
                    <DialogTitle>Adding an Organization</DialogTitle>
                    <DialogContent>
                        <form className={classes.root} autoComplete="off" onSubmit={this.submitHandler}>
                            <div>
                                <TextField id="name" label="name" variant="outlined" onChange={this.changeHandler} required/>
                            </div>
                            <div>
                                <TextField id="desc" label="desc" onChange={this.changeHandler}
                                multiline rows="5" variant="outlined" />
                            </div>
                            <Button type="submit">create</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

class Adding_inv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            _id_org: get_cookie("_id_org"),
            name: null,
            desc: null
        };
        this.access_token = this.props.access_token;
        this.url = "http://0.0.0.0:8888/organization/inventory";
    }

    handleOpen = () => {
        this.setState({open: true})
    }
    handleClose = () => {
        this.setState({open: false})
    }
    changeHandler = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }
    submitHandler = (event) => {
        event.preventDefault();
        let url = this.url;
        let body = {
            "_id_org": this.state._id_org,
            "name": this.state.name
        }
        console.log(body);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 202) {
                let resp = JSON.parse(this.responseText);
                console.log(resp);
            }
        }
        xhr.open("POST", url);
        xhr.setRequestHeader('Authorization', 'Bearer '+this.access_token);
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(body))
        this.handleClose();
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button size="small" color="primary" variant="contained" aria-label="add" onClick={this.handleOpen} disableElevation>
                    <AddIcon />Adding
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} className={classes.root}>
                    <DialogTitle>Adding an Organization</DialogTitle>
                    <DialogContent>
                        <form className={classes.root} autoComplete="off" onSubmit={this.submitHandler}>
                            <div>
                                <TextField id="name" label="name" variant="outlined" onChange={this.changeHandler} required/>
                            </div>
                            <div>
                                <TextField id="desc" label="desc" onChange={this.changeHandler}
                                multiline rows="5" variant="outlined" />
                            </div>
                            <Button type="submit">create</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

const Add_org = withStyles(useStyles)(Adding_org);
const Add_inv = withStyles(useStyles)(Adding_inv);

export {Add_org, Add_inv};