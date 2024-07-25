import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as forumThreadsAction from "../../../redux/forumThread/ForumThreadsAction"
import ForumMessageComponent from "../../ForumMessages/ForumMessageComponent"
import ForumMessageAddWidget from "../../ForumMessages/ForumMessageAddWidget"
import * as forumMessagesAction from "../../../redux/forumMessage/ForumMessagesAction"

class ForumMessagePage extends Component {
    render() {
        const { forumMessages } = this.props.forumMessageReducer
        let forumMessageList;
        if (forumMessages) {
            forumMessageList = forumMessages.map((forumMessage, index) => {
                return (<ForumMessageComponent key={forumMessage._id} forumThreadID={this.props.forumMessageReducer.forumThreadID} token={this.props.authenticationReducer.accessToken} forumMessage={forumMessage} index={index} className="forumMessage" />)
            })
            return (
                <div className="ForumManagement" style={{ background: 'white',paddingLeft:"50px" }}>
                    <br/>
        
                    <h3 className="text-center ">ForumMessage</h3>
                    <ForumMessageAddWidget forumThreadID={this.props.forumMessageReducer.forumThreadID} token={this.props.authenticationReducer.accessToken} />
                    <div className="container">
                        <div id="ForumMessageList" className="row">
                            {forumMessageList}
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="ForumManagement" style={{ background: 'white' }}>
                    <br/>
                    <h3 className="text-center ">ForumMessage</h3>
                    <ForumMessageAddWidget />
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return state
}
const mapDispatchToProps = dispatch => bindActionCreators({
    getForumAction: forumThreadsAction.getForumThreadsAction,
    getForumMessageAction: forumMessagesAction.getForumMessageAction
}, dispatch)

const ConnectForumMessagePage = connect(mapStateToProps, mapDispatchToProps)(ForumMessagePage)
export default ConnectForumMessagePage