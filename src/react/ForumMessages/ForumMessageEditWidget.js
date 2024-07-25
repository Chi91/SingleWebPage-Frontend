import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "react-bootstrap";
import { Modal, Form } from "react-bootstrap/"
import * as forumMessageAction from "../../redux/forumMessage/ForumMessagesAction"

class ForumMessageEditWidget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showEditDialog: false,
            title: this.props.forumMessage.title,
            text: this.props.forumMessage.text,
        }
        this.openEditDialog = this.openEditDialog.bind(this)
        this.closeEditDialog = this.closeEditDialog.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }
    openEditDialog(e) {
        e.preventDefault()
        this.setState({ showEditDialog: true })
    }
    closeEditDialog() {
        this.setState({
            showEditDialog: false,
            title: this.props.forumMessage.title,
            text: this.props.forumMessage.text,
        })
    }
    handleCancel(e) {
        e.preventDefault()
        this.setState({
            showEditDialog: false,
            title: this.props.forumMessage.title,
            text: this.props.forumMessage.text,
        })
    }

    handleSave(e) {
        e.preventDefault()
        const updateForumMessage = {
            title: this.state.title,
            text: this.state.text
        }
        const { token } = this.props
        const { forumMessage } = this.props
        const { forumThreadID } = this.props
        const { getEditForumMessageAction } = this.props
        getEditForumMessageAction(token, updateForumMessage, forumMessage._id, forumThreadID)
        this.closeEditDialog()
    }
    handleChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }
    render() {

        return (
            <>
                <Button variant="primary" onClick={this.openEditDialog}> Edit</Button>
                <Modal show={this.state.showEditDialog} onHide={this.closeEditDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit ForumMessage</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control id="ForumMessageNameInput" type="text" value={this.state.title} placeholder="Title" name="title" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Text</Form.Label>
                                <Form.Control id="ForumMessageDescriptionInput" as="textarea" row={5} value={this.state.text} placeholder="Text" name="text" onChange={this.handleChange} />
                            </Form.Group>
                            <Button id="CancelEditForumMessageButton" variant="secondary" type="submit" onClick={this.handleCancel}>Cancel</Button>
                            <Button id="SaveForumMessageButton" variant="primary" type="submit" onClick={this.handleSave}>Save</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}
const mapStateToProps = state => {
    return state;
}
const mapDispatchToProps = dispatch => bindActionCreators({
    getEditForumMessageAction: forumMessageAction.getEditForumMessageAction

}, dispatch)

const ConnectForumMessageEditWidget = connect(mapStateToProps, mapDispatchToProps)(ForumMessageEditWidget)
export default ConnectForumMessageEditWidget