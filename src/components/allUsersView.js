import React, {Component} from 'react';
import axios from "../utils/axios";
import UserItem from "./userItem";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";


class AllUsersView extends Component {

    state = {
        users : undefined
    };

    getAllUsers= () => {
        axios.get('/allUsers').then(
            response => {
                console.log(response.data);
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
            <div class="all-users-view">
                <TableContainer component={Paper} style={{    boxShadow: "none"}}>
                    <Table class="all-users-view__table">
                        <TableHead class="all-users-view__header">
                            <TableRow >
                                {headers.map(element => <TableCell key={element.name}
                                                                              align="left"
                                                                   style={ {   fontWeight: 'bold', fontSize: '1rem'}}
                                >{element.name}</TableCell>)}
                            </TableRow>
                        </TableHead>
                            {this.state.users?
                                <TableBody> {this.state.users.map((item) =>
                                (<UserItem key={item.id}
                                                     item={item}
                                           getAllUsers={this.getAllUsers} />
                                )
                            )}   </TableBody>  : null}
                    </Table>
                </TableContainer>
                </div>
        )
    }
}
export default AllUsersView;