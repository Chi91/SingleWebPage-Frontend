import React, {Component} from "react";
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import Container from "react-bootstrap/Container"
import UserSessionWidget from "./UserSessionWidget"

class TopMenu extends Component{
    render(){
        return(
            <div>
                <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                    <Container>
                        <Navbar.Brand href="#home">Magic The Gathering</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#home">History</Nav.Link>
                                <Nav.Link href="#link">Game</Nav.Link>
                                <NavDropdown title="Product" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Battle for baldurs gate</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Adventures in the forgotten realms</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Streets of New Capenna</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Warhammer</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                        <UserSessionWidget/>
                    </Container>
                </Navbar>
            </div>
        )
    }
}
export default TopMenu