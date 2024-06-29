/* eslint-disable */
import './DefaultLayout.css';
import { useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function DefaultLayout({ children, showSearchForm, searchTerm, handleSearchChange }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div>
      <Navbar
        expand="lg"
        style={{
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 75%, rgba(0,212,255,1) 100%",
        }}
      >
        <Container>
          <Navbar.Brand>
            <Link
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "2rem",
              }}
            >
              FilmsKrd
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNav} />
          <Navbar.Collapse id="basic-navbar-nav" className={isNavOpen ? "show" : ""}>
            <Nav className="me-auto">
              {!isHomePage && (
                <Nav.Link
                  href="/"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "2rem",
                  }}
                >
                  Home
                </Nav.Link>
              )}

              <Nav.Link
                href="/films"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "2rem",
                }}
              >
                Films
              </Nav.Link>
              <Nav.Link
                href="/companies"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "2rem",
                }}
              >
                Companies
              </Nav.Link>
              <Nav.Link
                href="/casts"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "2rem",
                }}
              >
                Casts
              </Nav.Link>
            </Nav>
            {showSearchForm && (
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  aria-label="Search"
                />
              </Form>
            )}
            <Nav>
              <NavDropdown title="User" id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="content">{children}</div>

      <div className="footer text-center">
        <hr />
        {/* Your footer content */}
      </div>
    </div>
  );
}

export default DefaultLayout;
