import React, {Component} from "react";
import Button from "react-bootstrap/Button"
import {connect} from "react-redux"
import{getShowLoginDialogAction} from "../../redux/authentication/AuthenticationActions"

class LoginDialog extends Component{
    constructor(props){
        super(props)
        this.showLoginDialog = this.showLoginDialog.bind(this);
    }

    showLoginDialog(){
        const dispatch = this.props.dispatch;
        dispatch(getShowLoginDialogAction())
    }
    
    render(){
        return(
        <div>
            <Button id="OpenLoginDialogButton" variant="light" onClick={this.showLoginDialog}>
                Login
            </Button>
        </div>
        )
    }
}
// Über connect() wird Verbindung zum Store hergestellt + Einbettung Component in High-Order-Component -> 
//erhält automatisch dispatch() in prop -> showLoginDialog() kann daher dispatch() verwenden 
export default connect()(LoginDialog)