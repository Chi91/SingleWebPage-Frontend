import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Modal } from "react-bootstrap";
import * as forumMessageAction from "../../redux/forumMessage/ForumMessagesAction"

class ForumMessageDeleteWidget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showDialog: false
        }
        this.openDialog = this.openDialog.bind(this)
        this.closeDialog = this.closeDialog.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    openDialog(e) {
        e.preventDefault()
        this.setState({ showDialog: true })
    }
    closeDialog() {
        this.setState({ showDialog: false })
    }
    handleSubmit(e) {
        e.preventDefault()
        const { forumMessage } = this.props
        const { accessToken } = this.props.authenticationReducer
        const { forumThreadID } = this.props
        const { getDeleteForumMessageAction } = this.props
        getDeleteForumMessageAction(accessToken, forumMessage._id, forumThreadID)
        this.closeDialog()
    }
    render() {
        return (
            <>
                <Button variant="warning" onClick={this.openDialog}>Delete</Button>
                <Modal show={this.state.showDialog} onHide={this.closeDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Do you really want to delete ForumMessage {this.props.index} ?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeDialog}>Close</Button>
                        <Button variant="primary" onClick={this.handleSubmit}>Delete</Button>
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
    getDeleteForumMessageAction: forumMessageAction.getDeleteForumMessageAction

}, dispatch)

const ConnectForumMessageDeleteWidget = connect(mapStateToProps, mapDispatchToProps)(ForumMessageDeleteWidget)
export default ConnectForumMessageDeleteWidget