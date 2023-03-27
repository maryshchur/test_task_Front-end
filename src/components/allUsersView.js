import React, {Component} from 'react';
import axios from "../utils/axios";
import UserItem from "./userItem";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

// const headers = [
//     {name: "User"},
//     {name: "Status"},
//     {name: "Location"},
//     {name: "Phone"},
//     {name: "Contact"},
//     {name: "Actions"},];

class AllUsersView extends Component {

    state = {
        users : undefined
    };

    getAllUsers= () => {
        axios.get('/allUsers').then(
            response => {
                // let data = response.data.content;
                console.log(response.data.content);
                this.setState({
                    users: response.data
                })
            }
        )
    };

    componentDidMount() {
        this.getAllUsers();
    }

    render() {
        const headers = [
            {name: "User"},
            {name: "Status"},
            {name: "Location"},
            {name: "Phone"},
            {name: "Contact"},
            {name: "Actions"},];

        return (
            <div style={{ width: '70%',  marginLeft:'15%',
                    marginRight:'15% ',marginTop: "10%"}} class="body">
            {/*// <Box sx={{ width: '70%',  marginLeft:'15%',*/}
            {/*//     marginRight:'15% ',marginTop: "10%"}} >*/}
                {/*<Paper sx={{ width: '70%', mb: 2 ,marginLeft:'15%',marginTop: "10%",*/}
                {/*    marginRight:'15% '}}>*/}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow >
                                {headers.map(element => <TableCell key={element.name}
                                                                              align="left" style={ {   fontWeight: 'bold'}}
                                >{element.name}</TableCell>)}
                            </TableRow>
                        </TableHead>
                            {/*{showRecordsListOrErrorMessage}*/}
                            {this.state.users?
                                <TableBody> {this.state.users.map((item) =>
                                (<UserItem key={item.id}
                                                     item={item}/>
                                )
                            )}   </TableBody>  : null}
                    </Table>
                </TableContainer>
                {/*</Paper>*/}
            {/*</Box>*/}
                </div>
        )
    }
}
export default AllUsersView;