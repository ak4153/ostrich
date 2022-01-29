import React from "react";
import styled from "styled-components";
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
} from "mdb-react-ui-kit";
const Footer = () => {
  return (
    <FooterWrapper bgColor="dark" className="text-center text-lg-left">
      <div
        className="text-center p-3  text-light"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a className="text-light" href="https://akportfolio-78cdf.web.app/">
          Alex Kreizelman
        </a>
      </div>
    </FooterWrapper>
  );
};
const FooterWrapper = styled(MDBFooter)`
  background-color: black;
  position: absolute;

  width: 100%;
  bottom: 0;
`;
export default Footer;
