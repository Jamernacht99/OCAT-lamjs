import React from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import '../scss/naviStyles.scss';

export const Navigation = () =>
  <header>
    <Navbar expand="md" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="/">OCAT</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav variant="hover" className="me-auto">
            <Nav.Link href="/">Dashboard</Nav.Link>
            <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Assessment"
                menuVariant="dark"
              >
                <NavDropdown.Item href="/assessment/new">
                  New Assessment
                </NavDropdown.Item>
                <NavDropdown.Item href="/assessment/list">
                  Assessment List
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="User"
                menuVariant="dark"
              >
                <NavDropdown.Item href="/user/new">
                  New User
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

          </Nav>
        </Navbar.Collapse>
        <Nav>
          <Button style={{ float: `right` }}>
            Logout
          </Button>
        </Nav>
      </Container>
    </Navbar>
  </header>;
