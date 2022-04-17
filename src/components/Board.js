import React, { useContext } from "react";
import { AppContext } from "../App";
import Letter from "./Letter";
import styled from 'styled-components/macro'

const BoardW = styled.div`
  height: 50rem;
  width: fit-content;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 768px) {
    height: 50vh;
    width: 40vh;
  }
`;

const BoardWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px;
  flex: 1;
`;

const Board = () => {
  return (
    <BoardW>
    <BoardWrapper>
      {" "}
      <Row>
        <Letter letterPos={0} attemptVal={0} />
        <Letter letterPos={1} attemptVal={0} />
        <Letter letterPos={2} attemptVal={0} />
        <Letter letterPos={3} attemptVal={0} />
        <Letter letterPos={4} attemptVal={0} />
        <Letter letterPos={5} attemptVal={0} />
      </Row>
      <Row>
        <Letter letterPos={0} attemptVal={1} />
        <Letter letterPos={1} attemptVal={1} />
        <Letter letterPos={2} attemptVal={1} />
        <Letter letterPos={3} attemptVal={1} />
        <Letter letterPos={4} attemptVal={1} />
        <Letter letterPos={5} attemptVal={1} />
      </Row>
      <Row>
        <Letter letterPos={0} attemptVal={2} />
        <Letter letterPos={1} attemptVal={2} />
        <Letter letterPos={2} attemptVal={2} />
        <Letter letterPos={3} attemptVal={2} />
        <Letter letterPos={4} attemptVal={2} />
        <Letter letterPos={5} attemptVal={2} />
      </Row>
      <Row>
        <Letter letterPos={0} attemptVal={3} />
        <Letter letterPos={1} attemptVal={3} />
        <Letter letterPos={2} attemptVal={3} />
        <Letter letterPos={3} attemptVal={3} />
        <Letter letterPos={4} attemptVal={3} />
        <Letter letterPos={5} attemptVal={3} />
      </Row>
      <Row>
        <Letter letterPos={0} attemptVal={4} />
        <Letter letterPos={1} attemptVal={4} />
        <Letter letterPos={2} attemptVal={4} />
        <Letter letterPos={3} attemptVal={4} />
        <Letter letterPos={4} attemptVal={4} />
        <Letter letterPos={5} attemptVal={4} />
      </Row>
      <Row>
        <Letter letterPos={0} attemptVal={5} />
        <Letter letterPos={1} attemptVal={5} />
        <Letter letterPos={2} attemptVal={5} />
        <Letter letterPos={3} attemptVal={5} />
        <Letter letterPos={4} attemptVal={5} />
        <Letter letterPos={5} attemptVal={5} />
      </Row>
      <Row>
        <Letter letterPos={0} attemptVal={6} />
        <Letter letterPos={1} attemptVal={6} />
        <Letter letterPos={2} attemptVal={6} />
        <Letter letterPos={3} attemptVal={6} />
        <Letter letterPos={4} attemptVal={6} />
        <Letter letterPos={5} attemptVal={6} />
      </Row>
    </BoardWrapper>
    </BoardW>
  );
}

export default Board;
