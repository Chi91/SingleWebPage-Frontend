import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import ForumThreadComponent from "../../ForumThreads/ForumThreadComponent"
import * as forumThreadsAction from "../../../redux/forumThread/ForumThreadsAction"
import ForumAddWidget from "../../ForumThreads/ForumThreadAddWidget"

class ForumThreadPage extends Component {
    componentDidMount() {
        const { getForumAction } = this.props
        const { accessToken } = this.props.authenticationReducer
        getForumAction(accessToken)
    }
    render() {
        const { forumThreads } = this.props.forumThreadReducer
        let forumList;
        if (forumThreads) {
            forumList = forumThreads.map((forumThread, index) => {
                const id = "ForumThread" + forumThread._id
                return (<ForumThreadComponent className="forumThread" id={id} key={forumThread._id+"bz"} forumThread={forumThread} index={index} token={this.props.accessToken} />)
            })
            return (
                <div className="ForumManagement" style={{ background: 'white', paddingLeft: "50px" }}>
                    <br/>
                    <h3 className="text-center ">ForumThread-Management</h3>
                    <ForumAddWidget />
                    <div className="container">
                        <div id="ForumThreadList" className="row">
                            {forumList}
                        </div>
                    </div>
                </div>
            )
        }
        else {
            <div className="ForumManagement" style={{ background: 'white' }}>
                <br/>
                <h3 className="text-center ">ForumThread-Management</h3>
                <ForumAddWidget />
            </div>
        }
    }
}

const mapStateToProps = (state) => {
    return state
}
const mapDispatchToProps = dispatch => bindActionCreators({
    getForumAction: forumThreadsAction.getForumThreadsAction,

}, dispatch)

const ConnectForumThreadPage = connect(mapStateToProps, mapDispatchToProps)(ForumThreadPage)
export default ConnectForumThreadPage
