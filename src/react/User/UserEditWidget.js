import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "react-bootstrap";
import {Modal, ButtonGroup, Form} from "react-bootstrap/"
import * as userAction from "../../redux/user/UsersActions"

class UserEditWidget extends Component {
    constructor(props) {
        super(props)
        this.state = {
           showEditDialog: false,
            userID: this.props.user.userID,
            password: "",
            userName: this.props.user.userName,
            isAdministrator: this.props.user.isAdministrator,
        }
        this.openEditDialog = this.openEditDialog.bind(this)
        this.closeEditDialog = this.closeEditDialog.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.checkAdmin = this.checkAdmin.bind(this)
    }
    openEditDialog(e) {
        this.setState({ showEditDialog: true })
    }
    closeEditDialog() {
        this.setState({ showEditDialog: false ,
            userID: this.props.user.userID,
            password: "",
            userName: this.props.user.userName,
            isAdministrator: this.props.user.isAdministrator,})

    }
    handleCancel(e) {
        e.preventDefault()
        this.setState({showEditDialog:false,
            userID: this.props.user.userID,
            password: "",
            userName: this.props.user.userName,
            isAdministrator: this.props.user.isAdministrator,})
    }
    handleSave(e) {
        e.preventDefault()
        var editUser = null 
        if(this.state.password !==""){
            editUser= {
                userID: this.state.userID,
                userName: this.state.userName,
                password: this.state.password,
                isAdministrator: this.state.isAdministrator
            } 
        }
        else{
            editUser= {
                userID: this.state.userID,
                userName: this.state.userName,
                isAdministrator: this.state.isAdministrator
            } 
        }
        const {editUserAction} = this.props
        const {accessToken} = this.props.authenticationReducer
        editUserAction(accessToken,editUser)
        this.setState({
            showEditDialog:false,
        })
    }
    
    handleChange(e){
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    checkAdmin(e){
        const {checked} = e.target
        this.setState({isAdministrator: checked})
    }

    render() {
        const user = this.props.user
        const id = "EditButton" + user.userID 
 
        return (
            <>
                <Button id={id} variant="primary" onClick={this.openEditDialog}> Edit </Button>
                <Modal show={this.state.showEditDialog} onHide={this.closeEditDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>User-ID</Form.Label>
                                <Form.Control id="UserIDInput" type="text" value={this.state.userID} placeholder="UserID" name="userID"  disabled/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>User-Name</Form.Label>
                                <Form.Control id="UserNameInput" type="text" value={this.state.userName} placeholder="UserName" name="userName" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Passwort</Form.Label>
                                <Form.Control id="PasswordInput" type="password" value={this.state.password} placeholder="Password" name="password" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <ButtonGroup>
                                    <   Form.Check id="IsAdministratorInput" type="checkbox" label="Admin" defaultChecked={this.state.isAdministrator} onClick={this.checkAdmin} />
                                </ButtonGroup>
                            </Form.Group>
                            <Button id="SaveUserButton" variant="secondary" type="submit" onClick={this.handleCancel}>Cancel</Button>
                            <Button id="CancelEditUserButton" variant="primary" type="submit" onClick={this.handleSave}>Save</Button>
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
    editUserAction : userAction.updateUserAction,
}, dispatch)

const ConnectUserEditWidget = connect(mapStateToProps, mapDispatchToProps)(UserEditWidget)
export default ConnectUserEditWidget