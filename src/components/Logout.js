import React from "react";
import styled from "styled-components";
import { useStateValue } from "./StateProvider";
import { auth, provider } from "../firebase";

const Logout = () => {
  return <LogoutWrapper>See you later</LogoutWrapper>;
};
const LogoutWrapper = styled.div``;
export default Logout;
