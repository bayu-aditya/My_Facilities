import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Edit_organization } from '../editing';
import { Delete_organization } from '../deleting';

export default function MenuRowOrg(params) {
    // params : {id_org, name_org, access_token}
    const ITEM_HEIGHT = 100;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
        <IconButton
            size="small"
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
        >
            <MoreVertIcon />
        </IconButton>
        <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
            style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: 150,
            },
            }}
        >
            <Edit_organization 
            id_org={params.id_org} />
            <Delete_organization
            id_org={params.id_org}
            name_org={params.name_org} />
        </Menu>
        </div>
    );
}