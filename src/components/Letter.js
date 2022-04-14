import React, { useContext, useEffect, useState } from "react";
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

// find indices of a given character in an array of characters
const getIndices = (word_arr, character) => {
  var indices = [];
  for (let i = 0; i < word_arr.length; i++) {
    if (word_arr[i] === character) {
      indices.push(i);
    }
  }
  return indices;
}

// check whether the letter should be colored as almost (pink) or incorrect
const checkAlmost = (correctWord, guessedWord, letterPos) => {
  const letter = guessedWord[letterPos];
  const correct = getIndices(correctWord, letter);
  const guess = getIndices(guessedWord, letter);

  var isAlmost = true;

  // if letter is guessed only once
  if (guess.length === 1) {
    return isAlmost;
  }
  
  // check if letter is guessed correctly in other positions
  var otherCorrect = 0;
  for (let i = 0; i < correct.length; i++) {
    if (guess.includes(correct[i])) {
      otherCorrect += 1;
    }
  }

  // if letter is already guessed in all correct positions:
  // do not highlight this incorrect location as almost
  if (otherCorrect === correct.length) {
    isAlmost = false;
    return isAlmost;
  }

  // check if letter is already highlighted as almost in other positions
  var alreadyAlmost = 0;
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] < letterPos && !correct.includes(guess[i])) {
      alreadyAlmost += 1;
    }
  }

  // if letter is already highlighted as almost in other incorrect positions:
  // only highlight if total letters highlighted (correct + almost) < number of times letter is present in correct word
  if ( (alreadyAlmost + otherCorrect) >= correct.length) {
    isAlmost = false;
  }

  return isAlmost;
}

function Letter({ letterPos, attemptVal }) {
  const { board, setDisabledLetters, currAttempt, correctWord } =
    useContext(AppContext);
  const letter = board[attemptVal][letterPos];
  const correct = correctWord.toUpperCase()[letterPos] === letter;

  const almost =
    // a letter has been typed and it is not correct but is present somewhere in the correct word
    (!correct && letter !== "" && correctWord.toUpperCase().includes(letter)

    // check whether to highlight as almost
    && checkAlmost([...correctWord.toUpperCase()], board[attemptVal], letterPos));

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
