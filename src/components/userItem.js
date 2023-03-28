import React, {Component} from 'react';
import axios from "../utils/axios";
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
import DialogContent from "@material-ui/core/DialogContent";

class UserItem extends Component {
    state = {
        openMoreInfoDialog: false,
        openDeleteDialog: false,
        anchorEl: null,
        retrievedImage: undefined
    }

    delete = () => {
        axios.delete(`/${this.props.item.id}`).then(
            response => {

                this.props.getAllUsers();

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
    componentDidMount() {
        // this.getImage();
    }

    getImage() {
        axios.get('/image').then(
            response => {
                // let data = response.data.content;
                console.log(response);
                console.log(response.data);
                console.log(response.data.content);
                this.setState({
                    retrievedImage : response.data
                })
                // 'data:image/jpeg;base64,' +
            }
        )

        //Make a call to Sprinf Boot to get the Image Bytes.
        // this.httpClient.get('http://localhost:8080/image' )
        //     .subscribe(
        //         res => {
        //             this.retrieveResonse = res;
        //             this.base64Data = this.retrieveResonse.picByte;
        //             this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        //         }
        //     );
    }



    render() {
        const url = "http://localhost:8090/images/"+this.props.item.imageUrl
        console.log(url)
        return (
            <>
                <TableRow class="tableCell">
                    {/*<Paper elevation={3} style={{    marginBlock: "2%"}}>*/}
                    {/*<TableCell align="right">*/}
                    {/*    <Avatar src={this.props.item.imageUrl}/>*/}
                    {/*</TableCell>*/}
                    <TableCell align="left">

                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <div>
                              {/*//TODO  generate full url on back with modelMapper*/}
                                <Avatar src={url} sx={{ width: 56, height: 56 }} />
                            </div>
                            <div style={{fontFamily: 'Roboto'}}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'start',
                                    marginLeft: '10%',
                                    flexDirection: 'column'
                                }}>
                                    <div style={{fontWeight: 'bold'}}>
                                        {this.props.item.firstName} {this.props.item.lastName}
                                    </div>
                                    <div style={{color: 'coral !important'}}>
                                        {this.props.item.email}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </TableCell>

                    < TableCell
                        align="left">

                        {this.props.item.status ? <p>
                            <span className="active-circle bg-success"></span> Active</p>
                        : <p>
                            <span className="active-circle bg-danger"></span> Inactive</p>
                        }
                    </TableCell>
                    <TableCell align="left">{this.props.item.location}</TableCell>
                    <TableCell align="left">{this.props.item.phone}</TableCell>
                    <TableCell align="left">
                        <Button
                            type="submit"
                             //fullWidth
                            variant="contained"
                            color="primary"
                            size="small"
                            // class = "btn-primary"
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
                            // keepMounted
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