import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
const Filters = ({ sortByName, sortByChange, handleFilter }) => {
  return (
    <RowWrapper xs={9} md={10} lg={10}>
      <ColWrapper></ColWrapper>
      <ColWrapper className="mt-5 p-0" onClick={sortByName}>
        Exchange Name
      </ColWrapper>
      <ColWrapper className="mt-5 p-0" onClick={sortByChange}>
        Change
      </ColWrapper>
      <Form.Group className="mt-5 p-0" controlId="formBasicEmail">
        <Form.Control
          onChange={(e) => handleFilter(e)}
          type="text"
          placeholder="filter"
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>
    </RowWrapper>
  );
};

const ColWrapper = styled(Col)`
  padding: 5px;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
  }
  &:nth-child(odd):hover {
    background: rgba(190, 178, 219, 0.7);
  }
  &:nth-child(even):hover {
    background: rgba(155, 155, 155, 0.4);
  }
`;

const RowWrapper = styled(Col)`
  display: flex;
  border-bottom: 2px solid grey;
  margin-bottom: 10px;
`;
export default Filters;
