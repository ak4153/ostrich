import React from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "../firebase";
import { actionTypes } from "../reducer";

const NavBar = ({ isAuth }) => {
  const [user, dispatch] = useStateValue();
  const handleLogout = () => {
    auth.signOut().then((res) => {
      console.log(res);
      dispatch({ type: actionTypes.SIGN_OUT });
    });
  };
  return (
    <Navbar bg="dark" variant="dark">
      {isAuth ? (
        <Container>
          <Navbar.Brand>Ostrich</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Markets
            </Nav.Link>
            <Nav.Link onClick={handleLogout} to="/logout">
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      ) : (
        <Container>
          <Navbar.Brand>Ostrich</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              Register
            </Nav.Link>
          </Nav>
        </Container>
      )}
    </Navbar>
  );
};

export default NavBar;
