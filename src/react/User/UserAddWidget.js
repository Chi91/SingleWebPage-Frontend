import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, ButtonGroup } from "react-bootstrap";
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import * as GrIcons from "react-icons/gr"
import * as usersAction from "../../redux/user/UsersActions"
import * as modalActions from "../../redux/modal/ModalActions"

class UserAddWidget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAdministrator: false,
            userID:"",
            userName:"",
            password:""
        }
        this.openAddDialog = this.openAddDialog.bind(this)
        this.closeAddDialog = this.closeAddDialog.bind(this)
        this.checkAdmin = this.checkAdmin.bind(this)
        this.handleChange= this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)

    }
    openAddDialog(e) {
        e.preventDefault()
        const {AddUserAddWidgetDialog}= this.props
        AddUserAddWidgetDialog()
    }
    closeAddDialog() {
        const {HideUserAddWidgetDialog} =this.props
        HideUserAddWidgetDialog()
    }

    // prüft was in dem checkbox für ein wert hat über e.target.checked bekommt man den gesetzen wert
    checkAdmin(e){
        const {checked} = e.target
        this.setState({isAdministrator: checked})
    }

    handleChange(e){
        const {name,value} = e.target
        this.setState({[name]: value})
    }
    handleSubmit(e){
        e.preventDefault()
        const user ={
            "userID": this.state.userID,
            "userName": this.state.userName,
            "password": this.state.password,
            "isAdministrator": this.state.isAdministrator
        }
        const {createUserAction} =this.props
        const {accessToken} = this.props.authenticationReducer
        createUserAction(accessToken,user)
        this.closeAddDialog()
    }

    render() {
        var showDialog = this.props.modalReducer.showDialog
        let errorMessage
        if (this.props.userReducer.error) {
            errorMessage = <Form.Label style={{ color: "red", marginLeft: "20px" }}> invalid input, please try again</Form.Label>
        }
        return (
            <>
                <Button id="OpenCreateUserDialogButton" variant="light" onClick={this.openAddDialog}><GrIcons.GrAddCircle /></Button>
                <Modal show={showDialog} onHide={this.closeAddDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>User-ID</Form.Label>
                                <Form.Control id="UserIDInput" type="text" placeholder="User ID" name="userID" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>User-Name</Form.Label>
                                <Form.Control id="UserNameInput" type="text" placeholder="UserName" name="userName" onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control id="PasswordInput" type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <ButtonGroup>
                                <   Form.Check id="IsAdministratorInput" type="checkbox" label="Admin" onClick={this.checkAdmin} />
                                </ButtonGroup>
                            </Form.Group>
                            <Button id="CreateUserButton" variant="primary" type="submit" onClick={this.handleSubmit} >Submit</Button>
                        </Form>
                        {errorMessage}
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
    createUserAction : usersAction.createUserAction,
    HideUserAddWidgetDialog: modalActions.getHideUserAddWidgetDialog,
    AddUserAddWidgetDialog: modalActions.getAddUserAddWidgetDialog

}, dispatch)

const ConnectUserAddWidget = connect(mapStateToProps, mapDispatchToProps)(UserAddWidget)
export default ConnectUserAddWidget