import React, {Component} from "react";
import {AppBar,Toolbar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import UserCreate from "./userCreate";

class Header extends Component {
    state = {
        openMoreInfoDialog: false,
        openDeleteDialog: false,
        anchorEl: null,
        openDialog: false
    }

   handleClose = () => {
        this.setState({openDialog: false})
       console.log("CLOSE")
    };
     refreshPage = () => {
        window.location.reload(false);
    }
    handleOpen = () => {
        this.setState({openDialog: true})
    };

    render() {
        return (
            <div
            >
                <AppBar position="static" style={{background: 'grey'}}>
                    <Toolbar style={{justifyContent: 'right'}}
                    >
                        <div>
                            <IconButton
                                color="black"
                                onClick={this.handleOpen}
                            >
                                <PersonAddAltIcon/>
                            </IconButton>

                            <Dialog
                                fullWidth={true}
                                maxWidth={'xs'}
                                    onClose={this.handleClose}
                                    aria-labelledby="simple-dialog-title"
                                    open={this.state.openDialog}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center !important' }}

                            >
                                <DialogTitle id="simple-dialog-title"
                                             style = {{textAlign: 'center'}}
                                >Create new user</DialogTitle>
                                <UserCreate handleClose={this.handleClose}
                                            refreshPage = {this.refreshPage}
                                />

                            </Dialog>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
};

export default Header;