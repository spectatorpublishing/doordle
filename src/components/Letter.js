import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import styled from 'styled-components'
import theme from "../theme";
import GameOver from "./GameOver";

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
    background-color: ${theme.colors.correct};
    color: white;
    border: 1px solid ${theme.colors.correct};
  }
  
  &.likely {
    background-color: ${theme.colors.likely};
    color: white;
    border: 1px solid ${theme.colors.likely};  
  }
  
  &.error {
    background-color: ${theme.colors.wrong};
    color: white;
    border: 0px;
    border: 1px solid ${theme.colors.wrong};
  }

  @media only screen and (max-width: 768px) {
    max-height: 3rem;
    max-width: 3rem;
  }

  @media only screen and (max-width: 280px) {
    max-height: 2.3rem;
    max-width: 2.3rem;
  }
`

function Letter({ letterPos, attemptVal }) {
  const { board, setDisabledLetters, setCorrectLetters, setAlmostLetters, currAttempt, setCurrAttempt, correctWord, getIndices, checkLikely, gameOver } =
    useContext(AppContext);
  const letter = board[attemptVal][letterPos];
  //const [letterState, setLetterState] = useState();
  const correct = correctWord.toUpperCase()[letterPos] === letter;

  const likely =
    // a letter has been typed and it is not correct but is present somewhere in the correct word
    (!correct && letter !== "" && correctWord.toUpperCase().includes(letter)

    // check whether to highlight as likely
    && checkLikely([...correctWord.toUpperCase()], board[attemptVal], letterPos));
  
  const letterState =
    ( (currAttempt.attempt > attemptVal) || gameOver.gameOver)
    && (correct ? "correct" : likely ? "likely" : letter !== "" ? "error": null);

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
    <LetterWrapper className={letterState}>
      {letter}
    </LetterWrapper>
  );
}

export default Letter;
