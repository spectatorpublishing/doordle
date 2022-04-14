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
  
  &.likely {
    background-color: #EFC3C0;
    color: white;
    border: 0px;
  }
  
  &.error {
    background-color: ${theme.colors.mediumGreen};
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

// check whether the letter should be colored as likely (pink) or incorrect
const checkLikely = (correctWord, guessedWord, letterPos) => {
  const letter = guessedWord[letterPos];
  const correct = getIndices(correctWord, letter);
  const guess = getIndices(guessedWord, letter);

  var isLikely = true;

  // if letter is guessed only once
  if (guess.length === 1) {
    return isLikely;
  }
  
  // check if letter is guessed correctly in other positions
  var otherCorrect = 0;
  for (let i = 0; i < correct.length; i++) {
    if (guess.includes(correct[i])) {
      otherCorrect += 1;
    }
  }

  // if letter is already guessed in all correct positions:
  // do not highlight this incorrect location as likely
  if (otherCorrect === correct.length) {
    isLikely = false;
    return isLikely;
  }

  // check if letter is already highlighted as likely in other positions
  var alreadyLikely = 0;
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] < letterPos && !correct.includes(guess[i])) {
      alreadyLikely += 1;
    }
  }

  // if letter is already highlighted as likely in other incorrect positions:
  // only highlight if total letters highlighted (correct + likely) < number of times letter is present in correct word
  if ( (alreadyLikely + otherCorrect) >= correct.length) {
    isLikely = false;
  }

  return isLikely;
}

function Letter({ letterPos, attemptVal }) {
  const { board, setDisabledLetters, setCorrectLetters, setAlmostLetters, currAttempt, correctWord } =
    useContext(AppContext);
  const letter = board[attemptVal][letterPos];
  const correct = correctWord.toUpperCase()[letterPos] === letter;

  const likely =
    // a letter has been typed and it is not correct but is present somewhere in the correct word
    (!correct && letter !== "" && correctWord.toUpperCase().includes(letter)

    // check whether to highlight as likely
    && checkLikely([...correctWord.toUpperCase()], board[attemptVal], letterPos));

  const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : likely ? "likely" : "error");

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
