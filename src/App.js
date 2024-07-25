import React, { Component } from "react"
import { connect } from "react-redux"
import "./layout/App.css"
import TopMenu from './react/components/TopMenu';
import LandingPage from "./react/components/pages/LandingPage";
import PrivatePage from "./react/components/pages/PrivatePage";
import UserManagement from "./react/components/pages/UserManagementPage";
import ForumThread from "./react/components/pages/ForumThreadPage"
import ForumMessage from "./react/components/pages/ForumMessagePage"
import Sidebar from "./react/components/Sidebar";
import { Routes, Route, Navigate } from 'react-router-dom';

class App extends Component {
  render() {
    const token = this.props.authenticationReducer.accessToken
    const admin = this.props.authenticationReducer.admin
  
    let workspace;

    if (token) {
      //Da jsx nur ein Html Element anzeigen, in () + div
      if(admin){
        workspace = (
          <div>
            <Sidebar admin={admin} />
            <Routes>
              <Route path="/" element={<PrivatePage/>} />
              <Route path="/usermanagement" element={<UserManagement/>} />
              <Route path="/forummanagement" element={<ForumThread/>}/>
              <Route path="/forumMessages" element={<ForumMessage/>}/>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        )
      }
      else{
        workspace = (
          <div>
            <Sidebar  />
            <Routes>
              <Route path="/" element={<PrivatePage/>} />
              <Route path="/forummanagement" element={<ForumThread/>}/>
              <Route path="/forumMessages" element={<ForumMessage/>}/>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        )
      }
    }
    else {
      workspace =(
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      ) 
    }
    return (
      <div className="App">
        <TopMenu />
        {workspace}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(App);
