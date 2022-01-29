import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "./StateProvider";
import { auth, provider, firebaseApp } from "../firebase";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { actionTypes } from "../reducer";
import Alert from "react-bootstrap/Alert";
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";

const Login = () => {
  const [user, dispatch] = useStateValue();
  const [loginErrors, setLoginError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const auther = getAuth();

    // will log out after window closed
    // setPersistence(auther, browserSessionPersistence).then((res) => {

    //   return auth.signInWithEmailAndPassword(email, password);
    // });

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        const message = err.message;

        if (message) {
          setLoginError("Email or Password are incorrect");
        }
      })
      .then((result) => {
        dispatch({ type: actionTypes.SET_USER, user: result.user });
      });
  };
  return (
    <div>
      {!loginErrors && user.message ? (
        <Alert variant="info">{user.message}</Alert>
      ) : (
        ""
      )}
      {loginErrors ? <Alert variant="danger">{loginErrors}</Alert> : ""}

      <LoginWrapper onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </LoginWrapper>
    </div>
  );
};
const LoginWrapper = styled(Form)`
  margin: 100px 50px 50px 50px;
  border: 3px solid grey;
  border-radius: 5px;
  padding 20px;
`;
export default Login;
