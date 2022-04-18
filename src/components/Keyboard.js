import React, { useCallback, useEffect, useContext } from "react";
import Key from "./Key";
import { AppContext } from "../App";
import styled from 'styled-components'
import theme from "../theme";

const KeyboardWrapper = styled.div`
  
  /*height: 50rem;
  width: fit-content;*/
  margin: 2rem 0rem 0rem 0rem; 
  padding: 0rem;

  @media only screen and (max-width: 768px) {
    /*height: 50vh; 
    width:  fit-content; */
    width: 90%;
    margin: 2rem 0rem 0rem 0rem; 
    padding: 0rem;

  }
`

const Line1 = styled.div`
  flex: 33%;
  display: flex;
  flex-direction: row;
  display: flex;
  justify-content: center;
`

const Line2 = styled.div`
  flex: 33%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Line3 = styled.div`
  flex: 33%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

function Keyboard() {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const {
    board,
    disabledLetters,
    correctLetters,
    almostLetters,
    currAttempt,
    gameOver,
    onSelectLetter,
    onEnter,
    onDelete,
  } = useContext(AppContext);

  const handleKeyboard = useCallback(
    (event) => {
      if (gameOver.gameOver) return;
      if (event.key === "Enter") {
        onEnter();
      } else if (event.key === "Backspace") {
        onDelete();
      } else {
        keys1.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
        keys2.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
        keys3.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
      }
    },
    [currAttempt]
  );
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <KeyboardWrapper onKeyDown={handleKeyboard}>
      <Line1>
        {keys1.map((key) => {
          return <Key keyVal={key} disabled={disabledLetters.includes(key)} correct={correctLetters.includes(key)} almost={almostLetters.includes(key)} />;
        })}
      </Line1>
      <Line2>
        {keys2.map((key) => {
          return <Key keyVal={key} disabled={disabledLetters.includes(key)} correct={correctLetters.includes(key)} almost={almostLetters.includes(key)} />;
        })}
      </Line2>
      <Line3>
        <Key keyVal={"ENTER"} bigKey />
        {keys3.map((key) => {
          return <Key keyVal={key} disabled={disabledLetters.includes(key)} correct={correctLetters.includes(key)} almost={almostLetters.includes(key)} />;
        })}
        <Key keyVal={"DELETE"} bigKey />
      </Line3>
    </KeyboardWrapper>
  );
}

export default Keyboard;
