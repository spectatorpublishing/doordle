import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";
import styled from 'styled-components'
import theme from "../theme";

const LetterWrapper = styled.div`
  flex: 1;
  min-height: 3rem;
  min-width: 3rem;
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
  
  &.error {
    background-color: #74A2A5;
    color: white;
    border: 0px;
  }

  @media only screen and (max-width: 768px) {
    min-height: 0rem;
    min-width: 0rem;
  }
`

function Letter({ letterPos, attemptVal }) {
  const { board, setDisabledLetters, currAttempt, correctWord } =
    useContext(AppContext);
  const letter = board[attemptVal][letterPos];
  const correctInstances = [...correctWord.toUpperCase()].filter((c) => (c === letter)).length;
  const guessedInstances = board[attemptVal].filter((c) => (c === letter)).length;

  const correct = correctWord.toUpperCase()[letterPos] === letter;

  const almost =
    // a letter has been typed and it is not correct but is in the correct word
    !correct && letter !== "" && correctWord.toUpperCase().includes(letter)

    // letter is in the guessed word only once at this (incorrect) position
    && ( ( guessedInstances === 1 ) 
    
    // or letter is in the guessed word more than once, but only once in correct word
    // --> highlight only first instance OR none if letter is also in correct position
    || ( correctInstances === 1
      && guessedInstances > 1
      && !board[attemptVal].slice(0, letterPos).includes(letter) 
      && board[attemptVal][correctWord.toUpperCase().indexOf(letter)] !== letter )

    // or letter is in the guessed word AND correct word twice, but only one of the n positions is correct
    || ( correctInstances > 1
      && correctInstances === guessedInstances )
    );

  const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
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
