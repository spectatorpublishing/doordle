import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import styled from 'styled-components'
import theme from "../theme";

const LetterWrapper = styled.div`
  flex: 1;
  height: 3rem;
  width: 3rem;
  border: 1px solid grey;
  margin: 0px 5px;
  display: grid;
  place-items: center;
  font-size: 30px;
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
  
  &.disabled {
    background-color: ${theme.colors.mediumGreen};
    color: white;
    border: 0px;
  }

  @media only screen and (max-width: 768px) {
    max-height: 3rem;
    max-width: 3rem;
  }
`

function Letter({ letterPos, attemptVal }) {
  const { board, setDisabledLetters, setCorrectLetters, setAlmostLetters, currAttempt, correctWord, getIndices, checkLikely } =
    useContext(AppContext);
  const letter = board[attemptVal][letterPos];
  const correct = correctWord.toUpperCase()[letterPos] === letter;

  const likely =
    // a letter has been typed and it is not correct but is present somewhere in the correct word
    (!correct && letter !== "" && correctWord.toUpperCase().includes(letter)

    // check whether to highlight as likely
    && checkLikely([...correctWord.toUpperCase()], board[attemptVal], letterPos));
  
  const disabled = (letter !== "" && !correct && !likely)

  useEffect(() => {
    if (letter !== "" && !correct && !likely) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
    else if (letter !== "" && correct) {
      setCorrectLetters((prev) => [...prev, letter]);
    }
    else if (letter !== "" && likely) {
      setAlmostLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);
  return (
    <LetterWrapper className={correct ? "correct" : likely ? "almost" : disabled ? "disabled" : null} >
      {letter}
    </LetterWrapper>
  );
}

export default Letter;
