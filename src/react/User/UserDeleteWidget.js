import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal"
import * as userAction from "../../redux/user/UsersActions"

class UserDeleteWidget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showDialog: false,
        }
        this.openDialog = this.openDialog.bind(this)
        this.closeDialog = this.closeDialog.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    openDialog() {
        this.setState({ showDialog: true })
    }
    closeDialog() {
        this.setState({ showDialog: false })
    }
    handleSubmit(e) {
        e.preventDefault()
        const { user } = this.props
        const { accessToken } = this.props.authenticationReducer
        const { deleteAction } = this.props
        deleteAction(accessToken, user.userID)
        this.setState({
            showDialog: false
        })
    }
    render() {
        const user = this.props.user
        const id = "DeleteButton" + user.userID

        return (
            <>
                <Button id={id} variant="warning" onClick={this.openDialog}>Delete</Button>
                <Modal show={this.state.showDialog} onHide={this.closeDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Do you really want to delete User: {user.userID}?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button id="DeleteUserCancel" variant="secondary" onClick={this.closeDialog}>Close</Button>
                        <Button id="DeleteUserConfirm" variant="primary" onClick={this.handleSubmit}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}
const mapStateToProps = state => {
    return state;
}
const mapDispatchToProps = dispatch => bindActionCreators({
    deleteAction: userAction.deleteUserAction
}, dispatch)

const ConnectUserDeleteWidget = connect(mapStateToProps, mapDispatchToProps)(UserDeleteWidget)
export default ConnectUserDeleteWidget