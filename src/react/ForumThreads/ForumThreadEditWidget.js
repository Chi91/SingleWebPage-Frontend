import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "react-bootstrap";
import {Modal, Form} from "react-bootstrap/"
import * as forumThreadAction from "../../redux/forumThread/ForumThreadsAction"

class ForumThreadEditWidget extends Component {
    constructor(props){
        super(props)
        this.state={
            showEditDialog:false,
            name: this.props.forumThread.name,
            description: this.props.forumThread.description,
        }
        this.openEditDialog = this.openEditDialog.bind(this)
        this.closeEditDialog = this.closeEditDialog.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    openEditDialog(e) {
        e.preventDefault()
        this.setState({showEditDialog:true})

    }
    closeEditDialog() {
        this.setState({showEditDialog:false,
            name: this.props.forumThread.name,
            description: this.props.forumThread.description,
        })

    }
    handleCancel(e) {
        e.preventDefault()
        this.setState({showEditDialog:false,
            name: this.props.forumThread.name,
            description: this.props.forumThread.description,})
    }

    handleSave(e) {
        e.preventDefault()  
        const updateForumThread={
            name: this.state.name,
            description: this.state.description
        }
        const {accessToken} = this.props.authenticationReducer
        const {forumThread} = this.props
        const {updateForumThreadAction} = this.props
        updateForumThreadAction(accessToken,updateForumThread,forumThread._id)
        this.closeEditDialog()
    }
    
    handleChange(e){
        const {name, value} = e.target
        this.setState({[name]: value})
    }


    render() {
        const {forumThread}  = this.props
        const id = "EditForumThreadButton" + forumThread._id
        return (
            <>
                <Button id={id} variant="primary" onClick={this.openEditDialog}> Edit</Button>
                <Modal show={this.state.showEditDialog} onHide={this.closeEditDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit ForumThread</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control id="ForumThreadNameInput" type="text" value={this.state.name} placeholder="Name" name="name" onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control id="ForumThreadDescriptionInput" as="textarea" row={5} value={this.state.description} placeholder="Description" name="description" onChange={this.handleChange} />
                            </Form.Group>
                            <Button id="SaveForumThreadButton" variant="secondary" type="submit" onClick={this.handleCancel}>Cancel</Button>
                            <Button id="CancelEditForumThreadButton" variant="primary" type="submit" onClick={this.handleSave}>Save</Button>
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
    updateForumThreadAction: forumThreadAction.updateForumThreadAction,
}, dispatch)

const ConnectForumThreadEditWidget = connect(mapStateToProps, mapDispatchToProps)(ForumThreadEditWidget)
export default ConnectForumThreadEditWidget