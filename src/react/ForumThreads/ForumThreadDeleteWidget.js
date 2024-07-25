import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Modal } from "react-bootstrap";
import * as forumThreadAction from "../../redux/forumThread/ForumThreadsAction"

class ForumThreadDeleteWidget extends Component {
    constructor(props){
        super(props)
        this.state = {
            showDialog:false
        }
        this.openDialog= this.openDialog.bind(this)
        this.closeDialog= this.closeDialog.bind(this)
        this.handleSubmit= this.handleSubmit.bind(this)
    }
    openDialog(e) {
        e.preventDefault()
        this.setState({showDialog:true})
        
    }
    closeDialog() {
        this.setState({showDialog:false})
    }
    handleSubmit(e){
        e.preventDefault()
        const forumThreadID  = this.props.id
        const {accessToken} = this.props.authenticationReducer
        const {deleteForumThreadAction} = this.props
        deleteForumThreadAction(accessToken,forumThreadID)
    }
    render() {
        const {forumThread} = this.props
        const id = "DeleteForumThreadButton" + forumThread._id

        return (
            <>
                <Button id = {id} variant="warning" onClick={this.openDialog}>Delete</Button>
                <Modal show={this.state.showDialog} onHide={this.closeDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete ForumThread</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Do you really want to delete ForumThread {this.props.index}?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button id="DeleteForumThreadCancel" variant="secondary" onClick={this.closeDialog}>Close</Button>
                        <Button id="DeleteForumThreadConfirm" variant="primary" onClick={this.handleSubmit}>Delete</Button>
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
    deleteForumThreadAction:forumThreadAction.deleteForumThreadAction
 
}, dispatch)

const ConnectForumThreadDeleteWidget = connect(mapStateToProps, mapDispatchToProps)(ForumThreadDeleteWidget)
export default ConnectForumThreadDeleteWidget