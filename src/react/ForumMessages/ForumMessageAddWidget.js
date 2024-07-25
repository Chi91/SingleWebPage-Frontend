import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import * as GrIcons from "react-icons/gr"
import * as forumMessageAction from "../../redux/forumMessage/ForumMessagesAction"

class ForumMessageAddWidget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            text: "",
            showAddDialog: false
        }
        this.openAddDialog = this.openAddDialog.bind(this)
        this.closeAddDialog = this.closeAddDialog.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    openAddDialog(e) {
        e.preventDefault()
        this.setState({ showAddDialog: true })

    }
    closeAddDialog() {
        this.setState({ showAddDialog: false })
    }
    handleCancel(e) {
        e.preventDefault()
        this.setState({ showEditDialog: false })
    }
    handleChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }
    handleSubmit(e) {
        e.preventDefault()
        const forumMessage = {
            "forumThreadID": this.props.forumThreadID,
            "title": this.state.title,
            "text": this.state.text,
        }

        const { getCreateForumMessageAction } = this.props
        const { accessToken } = this.props.authenticationReducer
        getCreateForumMessageAction(accessToken, forumMessage)
        this.closeAddDialog()
    }

    render() {

        let errorMessage
        if (this.props.error) {
            errorMessage = <Form.Label style={{ color: "red", marginLeft: "20px" }}> invalid input, please try again</Form.Label>
        }
        return (
            <div>
                <Button id="OpenCreateForumMessageDialogButton" variant="light" onClick={this.openAddDialog}><GrIcons.GrAddCircle /></Button>
                <Modal show={this.state.showAddDialog} onHide={this.closeAddDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create ForumMessage</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control id="ForumMessageTitleInput" type="text" placeholder="Title" name="title" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Text</Form.Label>
                                <Form.Control id="ForumMessageTextInput" type="text" placeholder="Text" name="text" onChange={this.handleChange} />
                            </Form.Group>
                            <Button id="CancelCreateForumMessageButton" variant="secondary" onClick={this.closeAddDialog}>Close</Button>
                            <Button id="CreateForumMessageButton" variant="primary" type="submit" onClick={this.handleSubmit} >Submit</Button>
                        </Form>
                        {errorMessage}
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

    getCreateForumMessageAction: forumMessageAction.getCreateForumMessageAction

}, dispatch)

const ConnectForumMessageAddWidget = connect(mapStateToProps, mapDispatchToProps)(ForumMessageAddWidget)
export default ConnectForumMessageAddWidget