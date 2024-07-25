import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import * as GrIcons from "react-icons/gr"
import * as modalActions from "../../redux/modal/ModalActions"
import * as forumThreadsAction from "../../redux/forumThread/ForumThreadsAction" 

class ForumThreadAddWidget extends Component {
    constructor(props) {
        super(props)
        this.state={
            showAddDialog:false,
            name:"",
            description: ""
        }
        this.openAddDialog = this.openAddDialog.bind(this)
        this.closeAddDialog = this.closeAddDialog.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    openAddDialog(e) {
        e.preventDefault()
        this.setState({showAddDialog:true})
    }
    closeAddDialog() {
        this.setState({showAddDialog:false})
    }

    handleChange(e){
        const {name,value} = e.target
        this.setState({[name]: value})
    }
    handleSubmit(e){
        e.preventDefault()
        const forumThread = {
            "name": this.state.name,
            "description": this.state.description
        }
        const {createForumThreadAction} = this.props
        const {accessToken} = this.props.authenticationReducer
        createForumThreadAction(accessToken,forumThread)
        this.closeAddDialog()
    }

    render() {
        let errorMessage
        if (this.props.error) {
            errorMessage = <Form.Label style={{ color: "red", marginLeft: "20px" }}> invalid input, please try again</Form.Label>
        }
        return (
            <div>
                <Button id="OpenCreateForumThreadDialogButton" variant="light" onClick={this.openAddDialog}><GrIcons.GrAddCircle /></Button>
                <Modal show={this.state.showAddDialog} onHide={this.closeAddDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create ForumThread</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control id="ForumThreadNameInput" type="text" placeholder="Name" name="name" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control id="ForumThreadDescriptionInput" type="text" placeholder="Description" name="description" onChange={this.handleChange}/>
                            </Form.Group>
                            <Button id="CancelCreateForumThreadButton" variant="secondary" onClick={this.closeAddDialog}>Close</Button>
                            <Button id="CreateForumThreadButton" variant="primary" type="submit" onClick={this.handleSubmit} >Submit</Button>
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
    showForumThreadAddWidgetDialog: modalActions.getShowForumThreadAddWidgetDialog,
    hideForumThreadAddWidgetDialog: modalActions.getHideForumThreadAddWidgetDialog,
    createForumThreadAction: forumThreadsAction.createForumThreadAction

}, dispatch)

const ConnectForumThreadAddWidget = connect(mapStateToProps, mapDispatchToProps)(ForumThreadAddWidget)
export default ConnectForumThreadAddWidget