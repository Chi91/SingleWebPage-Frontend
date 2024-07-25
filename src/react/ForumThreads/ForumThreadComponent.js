import React, { Component } from "react";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import ForumThreadDeleteWidget from "./ForumThreadDeleteWidget"
import ForumThreadEditWidget from "./ForumThreadEditWidget"
import * as BsIcon from "react-icons/bs"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as forumMessageAction from "../../redux/forumMessage/ForumMessagesAction"
import { Link } from "react-router-dom";

class ForumThreadComponent extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        const { accessToken } = this.props.authenticationReducer
        const { forumThread } = this.props
        const { getForumMessageAction } = this.props
        getForumMessageAction(accessToken, forumThread._id)

    }
    render() {
        const { forumThread } = this.props
        const { index } = this.props
        const id = "ViewForumThreadButton" + this.props.forumThread._id
        return (
            <div className="col-md-4" id={this.props.id}>
                <Card style={{ width: '18rem', margin: "30px" }}>
                    <Button variant="outline-light" id={id} onClick={this.handleClick}><Link to="/forumMessages"><BsIcon.BsList /></Link></Button>
                    <Card.Body>
                        <Card.Title>ForumThread {index}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{forumThread.name}</Card.Subtitle>
                        <Card.Text>
                            {forumThread.description}
                        </Card.Text>
                        <ButtonGroup >
                            <ForumThreadEditWidget id={forumThread._id} forumThread={forumThread} />
                            <ForumThreadDeleteWidget id={forumThread._id} index={this.props.index} forumThread={forumThread} />
                        </ButtonGroup>
                    </Card.Body>
                    <Card.Body>
                        <footer >
                            Created: {forumThread.createdAt}
                            Owner: {forumThread.ownerID}
                        </footer>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getForumMessageAction: forumMessageAction.getForumMessageAction,

}, dispatch)

const ConnectForumThreadComponent = connect(mapStateToProps, mapDispatchToProps)(ForumThreadComponent)
export default ConnectForumThreadComponent

