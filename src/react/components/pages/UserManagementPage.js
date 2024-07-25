import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "../../../layout/UserManagementPage.css"
import UserAddWidget from "../../User/UserAddWidget"
import UserSearchWidget from "../../User/UserSearchWidget"
import * as usersAction from "../../../redux/user/UsersActions"
import UserComponent from "../../User/UserComponent";
import { ButtonGroup } from "react-bootstrap";

class UserManagementPage extends Component {

    // componentDidMount() wird direkt aufgerufen, wenn Component in Dom eingetragen wird 
    // IdF wird eine Action losgeschickt, bei der aus dem Backend alle Users rausgeholt werden 
    // durch mapStateToProps sind die Users im props der Component verfügbar
    componentDidMount() {
        const { getUsersAction } = this.props;
        const { accessToken } = this.props
        getUsersAction(accessToken);
    }
    render() {
        const users = this.props.users
        if (users) {
            const userList = users.map((user, index) => {
                const id = "UserItem" + user.userID
                return (
                    <UserComponent id={id} key={user.userID} user={user} index={index} />
                )
            })
            return (
                <div className="userManagement" style={{ background: 'white', paddingLeft: "50px" }}>
                    <br/>
                    <h3 className="text-center ">User-Management</h3>
                    <ButtonGroup>
                        <UserAddWidget />
                        <UserSearchWidget />
                    </ButtonGroup>
                    <div className="container">
                        <div className="row">
                            {userList}
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="userManagement" style={{ background: 'white' }}>
                    <br/>
                    <br/>
                    <h3 className="text-center ">User-Management</h3>
                    <UserAddWidget />
                    <UserSearchWidget />
                </div>
            )
        }
    }
}
const mapStateToProps = state => {
    return ({
        accessToken: state.authenticationReducer.accessToken,
        users: state.userReducer.users,
    })
}
const mapDispatchToProps = dispatch => bindActionCreators({
    getUsersAction: usersAction.getUsersAction,

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementPage)