import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import CustomDialog from "./customDialog";

export default class Test extends Component {

    state = {
        openDialog: false,
        openDialogDelete: false,
        errorMessage: null,
    }

    render() {
        return (
            <>
                <Dialog
                    open={this.state.openDialogChangeEmail}
                    onClose={this.handleCloseDialogChangeEmail}
                    aria-labelledby="responsive-dialog-title"
                >
                    <CustomDialog
                        delete={this.delete}
                        open={this.state.openDialogDelete}
                        handleClose={this.handleCloseDialogDelete}
                        title="Delete user"
                        msg="Are you sure you want to delete this user?"/>
                </Dialog>
            </>
        )
    }
}