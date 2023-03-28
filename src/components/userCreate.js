import React, {Component} from 'react';
import {FormControl, TextField} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import axios from "../utils/axios";
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import AddAPhotoSharpIcon from '@mui/icons-material/AddAPhotoSharp';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {CssBaseline, IconButton, InputLabel, MenuItem, Select} from "@mui/material";

class UserCreate extends Component {

    state = {
        firstName: undefined,
        lastName: undefined,
        image: undefined,
        email: undefined,
        location: undefined,
        phone: undefined,
        status: undefined,
        open: false,
        err: undefined,
        errorMessages: {}
    };
    onChangeFirstName = (event) => {
        this.setState({firstName: event.target.value});
    };
    onChangeLastName = (event) => {
        this.setState({lastName: event.target.value});
    };
    onChangeEmail = (event) => {
        this.setState({email: event.target.value});
    };
    onChangeLocation = (event) => {
        this.setState({location: event.target.value});
    };
    onChangePhone = (event) => {
        this.setState({phone: event.target.value});
    };
    handleChangeStatus = (event) => {
        this.setState({status: event.target.value});
    };
    handleClickAddImage = (event) => {
        if (this.checkMimeType(event) && (this.checkFileSize(event))) {
            this.setState({

                image: event.target.files[0]
            },() => console.log(this.state.image))
        }
    };

    create = () => {
        const formData = new FormData();
        formData.append('file', this.state.image);
        const dto = {
            'firstName': this.state.firstName,
            'lastName': this.state.lastName,
            'email': this.state.email,
            'location': this.state.location,
            'phone': this.state.phone,
            'status': this.state.status
        };
        formData.append('firstName', this.state.firstName);
        formData.append('lastName', this.state.lastName);
        formData.append('email', this.state.email);
        formData.append('location', this.state.location);
        formData.append('phone', this.state.phone);
        formData.append('status', this.state.status);
        axios.post(`/create`, formData).then(
            response => {
                this.setState({open: true})
                this.props.refreshPage();

            }).catch(error => {
            console.log( this.state.image);
            let errors = {};
            error.response.data.forEach(err => {
                errors[[err.name]] = err.message;
            });
            this.setState({errorMessages: errors}, () => console.log(this.state));
            console.log(this.state.errorMessages);
            console.log(error.response.data);

        })
    };

    checkMimeType = (event) => {
        let files = event.target.files[0];
        if ((files.type !== 'image/png') && (files.type !== 'image/jpeg') && (files.type !== 'image/gif')) {
            this.setState({err: files.type + ' is not a supported format'});
        } else {
            this.setState({err: ('')});
            return true;
        }
    };
    checkFileSize = (event) => {
        let files = event.target.files[0];
        let size = 4000000;
        if (files.size > size) {
            this.setState({err: 'image is too large, please pick a smaller file'});
            return false
        } else {
            this.setState({err: ('')});
            return true;
        }
    };


    isCreateNotValid = () => {
        return (this.state.firstName === undefined || this.state.lastName === undefined || this.state.image === undefined ||
            this.state.location === undefined || this.state.phone === undefined || this.state.status === undefined ||
            this.state.email === undefined)
    };

    handleClose = () => {
        this.setState({open: false});
        this.props.handleClose();
    };


    render() {
        const selectValue = [
            {value: true, label: "Active"},
            {value: false, label: "Inactive"}];
        return (
            <div style={{textAlign: 'center'}}>
                <DialogContent dividers>
                    <CssBaseline/>
                    {this.state.err && <Alert severity="error">{this.state.err}</Alert>}
                    <IconButton
                        color="black"
                        component="label"
                    >
                        {this.state.image ? <AddAPhotoSharpIcon> </AddAPhotoSharpIcon> :
                            <AddAPhotoOutlinedIcon></AddAPhotoOutlinedIcon>}
                        <input type='file' multiple='true' accept="image/*"
                               style={{display: "none"}}
                               onChange={this.handleClickAddImage}
                        />
                    </IconButton>
                    <div>
                        <FormControl
                            fullWidth="true">
                            <TextField type="firstName" fullWidth="true"
                                       label="First name" onChange={this.onChangeFirstName}
                            />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl fullWidth="true">
                            <TextField type="lastName" label="Last name" onChange={this.onChangeLastName}
                            />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl fullWidth="true">
                            <TextField type="email" label="Email" onChange={this.onChangeEmail}
                            />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl fullWidth="true">
                            <TextField type="Phone" label="Phone" onChange={this.onChangePhone} />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl fullWidth="true">
                            <TextField type="Location"
                                       label="Location" onChange={this.onChangeLocation}
                            />
                        </FormControl>
                    </div>
                    <TextField fullWidth="true"
                               select
                               label="Status"
                               onChange={this.handleChangeStatus}
                    >
                        {selectValue.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.props.handleClose} color="primary">
                        Close
                    </Button>
                    <Button autoFocus disabled={this.isCreateNotValid()} onClick={this.create} color="primary">
                        Create
                    </Button>
                </DialogActions>
                <Snackbar open={this.state.open} autoHideDuration={1500} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                        User successfully created
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

export default UserCreate;