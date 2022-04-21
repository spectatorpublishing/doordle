import React, { useContext } from "react";
import { AppContext } from "../App";
import styled from 'styled-components'
import theme from "../theme";

const KeyWrapper = styled.div`
  width: 2.75rem;
  height: 3.5rem;
  margin: 0.2rem;
  border-radius: 0.25rem;
  display: grid;
  place-items: center;
  font-size: 1rem;
  font-weight: bold;
  background-color: ${theme.colors.doordashRed};
  color: white;
  font-family: 'Rubik', sans-serif;
  cursor: pointer;

  &.big {
    width: 4.5rem;
  }

  &.correct {
    background-color: ${theme.colors.correct};
  }
  
  &.almost {
    background-color: ${theme.colors.likely};
  }
  
  &.disabled {
    background-color: ${theme.colors.wrong};
  }

  @media only screen and (max-width: 768px) {
    width: 1.9rem;
    height: 3rem;
    margin: 0.15rem;
    font-size: 0.75rem;

    &.big {
      width: 3.1rem;
    }
  }
`

function Key({ keyVal, bigKey, disabled, correct, almost }) {
  const { gameOver, onSelectLetter, onDelete, onEnter } =
    useContext(AppContext);

  const selectLetter = () => {
    if (gameOver.gameOver) return;
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };
  return (
    <KeyWrapper
      className={bigKey ? "big" : correct ? "correct" : almost ? "almost" : disabled && "disabled"}
      onClick={selectLetter}
    >
      {keyVal}
    </KeyWrapper>
  );
}

export default Key;
