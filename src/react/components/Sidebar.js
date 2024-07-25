import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "../../data/SidebarData"
import "../../layout/Sidebar.css"
import { connect } from "react-redux"
import * as modalActions from "../../redux/modal/ModalActions"
import { bindActionCreators } from "redux"

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(e) {
        e.preventDefault()
        const { getReturnForumThreadsAction } = this.props
        getReturnForumThreadsAction()
    }

    render() {
        const admin = this.props.admin
        const [firstObject, secondObject] = SidebarData
        if (admin) {
            return (
                <div className="sidebar">
                    <nav className="nav-menu">
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path} id={item.id}>
                                        {item.icon}
                                    </Link>
                                </li>
                            )
                        }
                        )}
                    </nav>
                </div>
            )
        }
        else {
            return (
                <div className="sidebar">
                    <nav className="nav-menu">
                        <li key="firstObject" className={firstObject.cName}>
                            <Link to={firstObject.path} id={firstObject.id}>
                                {firstObject.icon}
                            </Link>
                        </li>
                        <li key="secondObject" className={secondObject.cName}>
                            <Link to={secondObject.path} id={secondObject.id} >
                                {secondObject.icon}
                            </Link>
                        </li>
                    </nav>
                </div>
            )
        }

    }
}

const mapStateToProps = state => {
    return state
}
const mapDispatchToProps = dispatch => bindActionCreators({
    getReturnForumThreadsAction: modalActions.getReturnForumThreadsAction
}, dispatch)

const ConnectSidebar = connect(mapStateToProps, mapDispatchToProps)(Sidebar)
export default ConnectSidebar