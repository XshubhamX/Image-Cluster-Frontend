import React from "react";
import {
    Navbar,
    Form,
    FormControl,
    NavDropdown,
    Button,
    Nav
} from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

const layout = (props) => {
    return (
        <React.Fragment>
            <Navbar bg="light" expand="lg" sticky="top">
                <LinkContainer to="/">
                    <Navbar.Brand>CONNECT</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <NavDropdown
                        className="ml-auto"
                        title="Select Category"
                        id="basic-nav-dropdown"
                    >
                        <NavDropdown.Item href="#action/3.1">
                            Image
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.2">Vector</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.2">Illustration</NavDropdown.Item>
                    </NavDropdown>
                    <Form inline>
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="mr-sm-1"
                        />
                    </Form>
                    <Nav className="d-flex">
                        <LinkContainer to="/login">
                            <Button className="ml-4" variant="primary" type="submit">
                                Search
                            </Button>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {props.children}
        </React.Fragment>
    )
};

export default layout;
