import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  list: {
      width: 250,
  },
  fullList: {
      width: 'auto'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function Navigation() {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [openDraw, setOpenDraw] = React.useState(false);

    const handleChange = event => {
        setAuth(event.target.checked);
    };

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenDraw = () => {setOpenDraw(true)}
    const handleCloseDraw = () => {setOpenDraw(false)}

    const to_login = () => {console.log("go to login page")}

    const sideList = () => (
        <div 
            className={classes.list}
            role="presentation"
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} onClick={handleCloseDraw} />
                </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <Drawer open={openDraw} onClose={handleCloseDraw}>
                {sideList()}
            </Drawer>
            <FormGroup>
                <FormControlLabel
                control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
                label={auth ? 'state: Login' : 'state: Logout'}
                />
            </FormGroup>
            <AppBar position="static">
                <Toolbar>
                <IconButton edge="start" className={classes.menuButton} onClick={handleOpenDraw} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Dashboard
                </Typography>
                {auth && (
                    <div>
                        <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        >
                        <AccountCircle />
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                        >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        </Menu>
                    </div>
                )}
                {!(auth) && (
                    <Button color="inherit" onClick={to_login}>Login</Button>
                )}
                </Toolbar>
            </AppBar>
        </div>
    );
}