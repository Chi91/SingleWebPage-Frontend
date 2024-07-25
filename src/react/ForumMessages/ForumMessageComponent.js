import React, { Component } from "react";
import { Card, ButtonGroup } from "react-bootstrap";
import ForumMessageDeleteWidget from "../ForumMessages/ForumMessageDeleteWidget"
import ForumMessageEditWidget from "./ForumMessageEditWidget"

class ForumMessageComponent extends Component {
    render() {
        const id = "ForumMessage" + this.props.forumMessage._id
        const { forumMessage } = this.props
        return (
            <div id={id} className="col-md-4">
                <Card style={{ width: '18rem', margin: "30px" }}>
                    <Card.Body>
                        <Card.Title>ForumMessage {this.props.index} </Card.Title>
                        <Card.Text>
                            {forumMessage.title}
                        </Card.Text>
                        <Card.Text>
                            {forumMessage.text}
                        </Card.Text>
                        <ButtonGroup>
                            <ForumMessageEditWidget forumThreadID={this.props.forumThreadID} forumMessage={this.props.forumMessage} token={this.props.token} />

                            <ForumMessageDeleteWidget forumThreadID={this.props.forumThreadID} forumMessage={this.props.forumMessage} index={this.props.index} token={this.props.token} />
                        </ButtonGroup>



                    </Card.Body>
                    <Card.Body>
                        <footer >
                            Created: {forumMessage.createdAt} <br></br>
                            authorID: {forumMessage.authorID}
                        </footer>
                    </Card.Body>
                </Card>
            </div>
        )
    }

}
export default ForumMessageComponent