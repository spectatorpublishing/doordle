import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";
import styled from 'styled-components'
import theme from "../theme";

const LetterWrapper = styled.div`
  flex: 1;
  border: 1px solid grey;
  margin: 0px 5px;
  display: grid;
  place-items: center;
  font-size: 40px;
  font-weight: bolder;
  color: ${theme.colors.black};
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 2px;

  &.correct {
    background-color: #B71000;
    color: white;
    border: 0px;
  }
  
  &.almost {
    background-color: #EFC3C0;
    color: white;
    border: 0px;
  }
  
  &.error {
    background-color: #74A2A5;
    color: white;
    border: 0px;
  }
`

function Letter({ letterPos, attemptVal }) {
  const { board, setDisabledLetters, currAttempt, correctWord } =
    useContext(AppContext);
  const letter = board[attemptVal][letterPos];
  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost =
    !correct && letter !== "" && correctWord.toUpperCase().includes(letter);
  const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      console.log(letter);
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);
  return (
    <LetterWrapper className={letterState}>
      {letter}
    </LetterWrapper>
  );
}

export default Letter;
