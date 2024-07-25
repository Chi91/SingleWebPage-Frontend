import React, { Component } from "react"
import dummypic from "../../layout/picture/dummypic.jpg"
import { ButtonGroup, ListGroup, ListGroupItem } from "react-bootstrap";
import { Card } from "react-bootstrap";
import UserEditWidget from "./UserEditWidget";
import UserDeleteWidget from "./UserDeleteWidget"

class UserComponent extends Component {
    render() {
        const user = this.props.user
        const index = this.props.index
        return (
            <div className="col-md-3" id={this.props.id} gap="2rem">
                <Card>
                    <Card.Img variant="top" src={dummypic} alt="dummypic" className="dummypic" />
                    <Card.Body>
                        <Card.Title>User {index}</Card.Title>
                        <Card.Body />
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>userID = {user.userID}</ListGroupItem>
                            <ListGroupItem>userName = {user.userName}</ListGroupItem>
                            <ListGroupItem>isAdministrator = {JSON.stringify(user.isAdministrator)}</ListGroupItem>
                        </ListGroup>
                        <Card.Body />
                        <ButtonGroup>
                            <UserEditWidget user={user} />
                            <UserDeleteWidget user={user} />
                        </ButtonGroup>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
export default UserComponent