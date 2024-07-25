import React, { Component } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { Spinner } from "react-bootstrap"
import Form from "react-bootstrap/Form"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as authenticationActions from "../../redux/authentication/AuthenticationActions"

class UserSessionWidget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userID: "",
            password: "",
            enableButton: false,

        };
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleLogOut = this.handleLogOut.bind(this)
    }

    // Muss mit setState() aufgerufen werden, beim Setzen von State , sonst kein neurendern
    handleShow(e) {
        e.preventDefault()
        const { showLoginDialogAction } = this.props;
        // da mit mapDispatchToProps verbunden, enthält dispatch(), durch Aufruf der Methode wird Aktion versendet
        showLoginDialogAction();
    }

    handleClose(e) {
        const { hideLoginDialogAction } = this.props;
        hideLoginDialogAction();
        this.setState({ enableButton: false })
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value }, () => {
            if (this.state.userID.trim() && this.state.password.trim()) {
                this.setState({ enableButton: true })
            }
            else {
                this.setState({ enableButton: false })
            }
        });
    }

    handleSubmit(e) {
        // Damit Defaultaktion verhindert wird --> refresh Website verhindern
        e.preventDefault()
        const { userID, password } = this.state;
        const { authenticateUserAction } = this.props;
        authenticateUserAction(userID, password);

    }
    handleLogOut(e) {
        e.preventDefault()
        const { logoutUserAction } = this.props;
        logoutUserAction()
        this.setState({
            userID: "",
            password: "",
            enableButton: false
        })
    }
    // Wenn Änderung stattfinden am State, wird render() aufgerufen mit modi State
    render() {
        var showDialog = this.props.authenticationReducer.showLoginDialog;
        if (showDialog === undefined) {
            showDialog = false;
        }
        const token = this.props.authenticationReducer.accessToken
        let button;
        let spinner
        let errorMessage;

        if (token) {
            button = <Button id="LogoutButton" variant="light" onClick={this.handleLogOut}>Log Out</Button>
        }
        else {
            button = <Button variant="light" onClick={this.handleShow}>Sign in </Button>

            if (this.props.authenticationReducer.pending) {
                spinner = <Spinner animation="border" variant="info" />
            }
            if (this.props.authenticationReducer.error) {
                errorMessage = <Form.Label style={{ color: "red", marginLeft: "20px" }}> invalid userid or password, please try again</Form.Label>
            }
        }
        return (
            <div>
                {button}
                <Modal show={showDialog} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>User-ID</Form.Label>
                                <Form.Control id="LoginUserIDInput" type="text" placeholder="User ID" name="userID" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Passwort</Form.Label>
                                <Form.Control id="LoginPasswordInput" type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                            </Form.Group>
                            <Button disabled={!this.state.enableButton} id="LoginButton" variant="primary" type="submit" onClick={this.handleSubmit}>Submit</Button>
                            {spinner}
                            {errorMessage}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="link"> Passwort vergessen?</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
// Holt aus Store die Änderung raus und fügt modi props an die Komponenten
const mapStateToProps = state => {
    return state;
}
// bindActionCreators() verbindet Actions die keinen dispatch() mit dispatch -> Folge: Aktion sind über Props abgreifbar nun
// die Methoden -optional neue Namen -(showLoginDialogAction(neu) = authenticationActions.getShowLoginDialogAction(alt))
const mapDispatchToProps = dispatch => bindActionCreators({
    showLoginDialogAction: authenticationActions.getShowLoginDialogAction,
    hideLoginDialogAction: authenticationActions.getHideLoginDialogAction,
    authenticateUserAction: authenticationActions.authenticateUser,
    logoutUserAction: authenticationActions.logoutUser
}, dispatch)

const ConnectedUserSessionWidget = connect(mapStateToProps, mapDispatchToProps)(UserSessionWidget)

export default ConnectedUserSessionWidget