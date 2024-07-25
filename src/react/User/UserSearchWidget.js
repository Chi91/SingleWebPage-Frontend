import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import * as modalActions from "../../redux/modal/ModalActions"
import * as BIcons from "react-icons/bi"

class UserSearchWidget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showSearchDialog: false
        }
        this.openSearchDialog = this.openSearchDialog.bind(this)
        this.closeSearchDialog = this.closeSearchDialog.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    openSearchDialog() {
        this.setState({ showSearchDialog: true })
    }
    closeSearchDialog() {
        this.setState({ showSearchDialog: false })
    }
    handleSubmit(e) {
        e.preventDefault()
    }
    render() {
        return (
            <div>
                <Button variant="light" onClick={this.openSearchDialog}> <BIcons.BiSearchAlt /></Button>
                <Modal show={this.state.showSearchDialog} onHide={this.closeSearchDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>User-ID</Form.Label>
                                <Form.Control id="LoginUserIDInput" type="text" placeholder="User ID" name="userID" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>User-Name</Form.Label>
                                <Form.Control id="LoginUserIDInput" type="text" placeholder="User ID" name="userID" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Passwort</Form.Label>
                                <Form.Control id="LoginPasswordInput" type="password" placeholder="Password" name="password" />
                            </Form.Group>
                            <Button id="LoginButton" variant="primary" type="submit" onClick={this.handleSubmit}>Search</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return state;
}
const mapDispatchToProps = dispatch => bindActionCreators({
    showEditUserDialogAction: modalActions.getShowEditUserDialogAction,
    hideEditUserDialogAction: modalActions.getHideEditDialog,
}, dispatch)

const ConnectUserSearchWidget = connect(mapStateToProps, mapDispatchToProps)(UserSearchWidget)
export default ConnectUserSearchWidget