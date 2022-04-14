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
const checkAlmost = (correctWord, guessedWord, letterPos, letter) => {
  console.log("checking: ", letter, letterPos);

  const correct = getIndices([...correctWord.toUpperCase()], letter);
  const guess = getIndices(guessedWord, letter);

  var isAlmost = true;

  // if letter is guessed only once
  if (guess.length === 1) {
    console.log("guessed only once");
    return isAlmost;
  }
  
  var otherCorrect = 0;
  for (let i = 0; i < correct.length; i++) {
    if (guess.includes(correct[i])) {
      otherCorrect += 1;
    }
  }
  console.log("other correct: ", otherCorrect);
  console.log("total correct: ", correct.length);

  if (otherCorrect === correct.length) {
    isAlmost = false;
    return isAlmost;
  }

  var alreadyAlmost = 0;
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] < letterPos && !correct.includes(guess[i])) {
      alreadyAlmost += 1;
    }
  }

  if ( (alreadyAlmost + otherCorrect) >= correct.length) {
    isAlmost = false;
  }

  console.log("already almost: ", alreadyAlmost);
  console.log("taken: ", alreadyAlmost + otherCorrect);
  console.log("is almost: ", isAlmost);

  return isAlmost;
}

function Letter({ letterPos, attemptVal }) {
  const { board, setDisabledLetters, currAttempt, correctWord } =
    useContext(AppContext);
  const letter = board[attemptVal][letterPos];
  // const correctInstances = [...correctWord.toUpperCase()].filter((c) => (c === letter)).length;
  // const guessedInstances = board[attemptVal].filter((c) => (c === letter)).length;
  // const isAlmost = checkAlmost(correctIndices, guessedIndices, letterPos, letter);

  const correct = correctWord.toUpperCase()[letterPos] === letter;

  const almost =
    // a letter has been typed and it is not correct but is in the correct word
    (!correct && letter !== "" && correctWord.toUpperCase().includes(letter)
    && checkAlmost(correctWord, board[attemptVal], letterPos, letter));

    // // the letter is guessed fewer times than it is present in the word
    // && ( ( guessedIndices.length <= correctIndices.length )

    // // or the letter is guessed more times than it is present in the word
    // || ( guessedIndices.length > correctIndices.length
    //   && board[attemptVal].slice(0, letterPos).filter((c) => (c === letter)).length < correctIndices.length
    //   && board[attemptVal][correctWord.indexOf(letter)] !== letter )
    // );

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
