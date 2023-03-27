import React, {Component} from 'react';
import axios from "axios";
import {
    Avatar,
    Backdrop, Box,
    Button,
    IconButton, Menu,
    MenuItem, Paper,
    Select,
    styled, SvgIcon,
    TableCell,
    TableRow,
    Tooltip
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dialog from "@material-ui/core/Dialog";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CustomDialog from "./customDialog";
import EditIcon from '@mui/icons-material/Edit';
import Test from "./test";
import DialogContent from "@material-ui/core/DialogContent";

class UserItem extends Component {
    state = {
        openMoreInfoDialog: false,
        openDeleteDialog: false,
        anchorEl: null
    }

    delete = () => {
        axios.delete(`/${this.props.item.id}`).then(
            response => {

                // this.props.getRecordsData();

            }).catch(error => {

            console.dir(error.response.data);
        })
    };
    handleOpenMoreInfoDialog = (event) => {
        this.setState({openMoreInfoDialog: true});
        this.setState({anchorEl: event.currentTarget});

    };

    handleCloseMoreInfoDialog = () => {
        this.setState({openMoreInfoDialog: false});
        this.setState({anchorEl: null});
    };
    handleOpenDeleteDialog = () => {
        this.setState({openDeleteDialog: true});

        this.setState({openMoreInfoDialog: false});
        this.setState({anchorEl: null});
    };

    handleCloseDeleteDialog = () => {
        this.setState({openDeleteDialog: false});
    };


    render() {
        return (
            <>
                {/*class="tableRow"*/}
                {/*class="tableCell"*/}
                <TableRow class="tableCell">
                    {/*<Paper elevation={3} style={{    marginBlock: "2%"}}>*/}
                    {/*<TableCell align="right">*/}
                    {/*    <Avatar src={this.props.item.imageUrl}/>*/}
                    {/*</TableCell>*/}
                    <TableCell align="left" >
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <div>
                                <Avatar
                                    src="/341060.jpg"
                                    // src={this.props.item.imageUrl}
                                />
                            </div>
                            <div style={{fontFamily: 'Roboto'}}>
                                <div style={{display: 'flex',alignItems: 'start',marginLeft: '10%',flexDirection: 'column'}}>
                                <div style={{fontWeight: 'bold'}}>
                                    {/*fontSize: '1.25rem',*/}
                                {/*    <h5>*/}
                                    {/*      style={{  fontWeight: 'bold'}}>*/}
                                    {this.props.item.firstName} {this.props.item.lastName}
                                {/*</h5>*/}
                                </div>
                                <div style={{color: 'coral !important'}}>
                                    {/*#6c757d*/}
                                    {/*<p>*/}
                                    {this.props.item.email}
                                {/*</p>*/}
                                </div>
                                    </div>
                            </div>

                        </div>
                    </TableCell>

                    < TableCell
                        align="left">{this.props.item.status}
                    </TableCell>
                    <TableCell align="left">{this.props.item.location}</TableCell>
                    <TableCell align="left">{this.props.item.phone}</TableCell>
                    <TableCell align="left">
                        <Button
                            type="submit"
                            //  fullWidth
                            variant="contained"
                            color="primary"
                            size="small"
                            // onClick={this.getData}
                        >
                            Contact
                        </Button>
                    </TableCell>
                    <TableCell align="left">
                        <IconButton
                            // class="dropbtn"
                            color="primary"
                            // component="label"
                            onClick={this.handleOpenMoreInfoDialog}
                        >
                            <MoreVertIcon/>
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            // id="long-menu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={Boolean(this.state.openMoreInfoDialog)}
                            onClose={this.handleCloseMoreInfoDialog}
                            PaperProps={{
                                style: {
                                    // maxHeight: ITEM_HEIGHT * 4.5,
                                    // width: '20ch',
                                },
                            }}
                        >
                            <MenuItem onClick={this.handleCloseMoreInfoDialog}>
                                <Button
                                    // variant="contained"
                                    color="inherit"
                                    size="small"
                                    // style={{
                                    //     justifyContent: 'flexStart !important', marginLeft: '2%'
                                    // }}
                                    startIcon={<EditIcon/>}
                                    // onClick={this.handleOpenDialogDelete}
                                >
                                    Edit</Button>


                            </MenuItem>
                            <MenuItem onClick={this.handleOpenDeleteDialog}>
                                <Button
                                    color="error"
                                    size="small"
                                    // style={{
                                    //     justifyContent: 'flexStart !important', marginLeft: '2%'
                                    // }}
                                    startIcon={<DeleteOutlineIcon/>}
                                    onClick={this.handleOpenDeleteDialog}
                                >
                                    Delete</Button>
                            </MenuItem>

                        </Menu>
                        <CustomDialog delete={this.delete}
                                      open={this.state.openDeleteDialog}
                                      handleClickOpen={this.handleOpenDeleteDialog}
                                      handleClose={this.handleCloseDeleteDialog}
                                      title="Delete user"
                                      msg="Are you sure you want to delete this user?"/>
                    </TableCell>
                    {/*</Paper>*/}
                </TableRow>

            </>
        );
    }


}

export default UserItem;