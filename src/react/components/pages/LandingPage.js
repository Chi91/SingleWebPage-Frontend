import React, { Component } from "react";
import LoginDialog from "../LoginDialog";

class LandingPage extends Component {
    render() {
        return (
            <div className="page-content" id="LandingPage" style={{ background: 'white' }}>
                <br/>
                <br />
                Herzlich Willkommen auf der Webseite, hier finden Sie alle Infos zu Magic the Gathering!
                <br />
                Treten Sie in die geheimnisvolle und magische Welt ein - Sie werden es nicht bereuen
                <br /> 
                <br />
                <LoginDialog />
            </div>
        )
    }
}
export default LandingPage