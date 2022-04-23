import "./App.css";
import React, { useState, createContext, useEffect } from "react";
import styled from 'styled-components';
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateTimedWordSet, generateWordSet } from "./Words";
import Modal from "./components/EmailSignup/Modal.js"
import GameOver from "./components/GameOver";
import TopBar from "./components/TopBar/TopBar";
import InstructionsPopup from "./components/InstructionsPopup/InstructionsPopup";
import InvalidPopup from "./components/InvalidPopup/InvalidPopup";
import { useCookies } from "react-cookie";

export const AppContext = createContext();

const TopBarWrapper = styled.div`
    display: flex;
`;

const GameWrapper = styled.div`
  width: 100vw;
  height: fit-content;
  display: flex;
  align-items: center;
  padding-top: 30px;
  flex-direction: column;
`

function App() {
  const [cookies, setCookie, removeCookie] = useCookies()

  const [board, setBoard] = useState(boardDefault);
  const [emojiBoard, setEmojiBoard] = useState("");
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [almostLetters, setAlmostLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [openModal, setOpenModal] = useState(false);
  const [openInstructions, setOpenInstructions] = useState(false);
  const [showInvalid, setShowInvalid] = useState(false);

  useEffect(() => {
    // new word on each re-render
    // generateWordSet().then((words) => {
    //   setWordSet(words.wordSet);
    //   setCorrectWord(words.todaysWord);
    // });

    // new word each 12 hours
    generateTimedWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
      console.log("chosen word: ", words.todaysWord);

      initializeGame(words.todaysWord)
    })
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowInvalid(false);
    }, 750);
  }, [showInvalid]);

  // clear any cookies or set game to previous game configuration
  const initializeGame = (todaysWord) => {
    /* console.log("current cookies:\n")
    console.log(cookies) */

    if (cookies.lastPlayed && !alreadyPlayed(todaysWord)){
      // if not already played with current word, clear cookies
      clearCookies()
    }

    // if any cookies stored, use them to initialize game
    if (cookies.board){
      setBoard(cookies.board)
    } else {
      setOpenInstructions(true)
    }

    if (cookies.currAttempt){
      setCurrAttempt(cookies.currAttempt)
    }

    if (cookies.gameOver){
      setGameOver(cookies.gameOver)
    }

    if (cookies.emojiBoard){
      setEmojiBoard(cookies.emojiBoard)
    }

    /* console.log("current cookies:\n")
    console.log(cookies) */
  }

  const alreadyPlayed = (todaysWord) => {
    var currentDate = new Date();

    // if last time played is not today, they can play again
    if (cookies.lastPlayed.day !== currentDate.getDate() && cookies.lastPlayed.month !== currentDate.getMonth()){
      console.log("last time played not today")
      return false;
    }

    // if they have already played today, if the current correct word
    // is different that their last correct word, they can play
    if (todaysWord !== cookies.correctWord){
      console.log("different new word")
      return false;
    }

    return true;
  }

  const clearCookies = () => {
    removeCookie("board")
    removeCookie("gameOver")
    removeCookie("lastPlayed")
    removeCookie("correctWord")
    removeCookie("currAttempt")
    removeCookie("emojiBoard")
    removeCookie("emailSubmitted")
  }

  const setCookies = (guessedWord) => {
    var pathAvailable = {path: "/"}
    setCookie("board", board, pathAvailable)
    setCookie("correctWord", correctWord, pathAvailable)
    setCookie("gameOver", { gameOver: true, guessedWord: guessedWord }, pathAvailable)
    setCookie("lastPlayed", {day: new Date().getDate(), month: new Date().getMonth()}, pathAvailable)
    setCookie("currAttempt", currAttempt, pathAvailable)
    setCookie("emojiBoard", emojiBoard, pathAvailable)
  }

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

  // check whether the letter should be colored as likely or incorrect
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

  const updateEmojiBoard = (currWord) => {
    var newEmojiBoard = emojiBoard
    const word = currWord.toUpperCase().split("")
    console.log(currWord)
    console.log(word)
    for (let j = 0; j <5; j++){
      const correct = correctWord.toUpperCase()[j] === word[j];

      // a letter has been typed and it is not correct but is present somewhere in the correct word
      const likely = (!correct && correctWord.toUpperCase().includes(word[j])
      && checkLikely([...correctWord.toUpperCase()], word, j))
        
      if (!correct && !likely){
        newEmojiBoard = newEmojiBoard + "⬛️"
      } else if (correct){
        newEmojiBoard = newEmojiBoard + "🟩"
      } else if (likely){
        newEmojiBoard = newEmojiBoard + "🟨"
      }
    } 

    newEmojiBoard = newEmojiBoard + "\n"

    setEmojiBoard(newEmojiBoard)
    setCookie("emojiBoard", newEmojiBoard, {path: '/'})
  }

  const onEnter = () => {
    if (currAttempt.letter !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    console.log(board)
    console.log(currAttempt)

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
      setCookie("currAttempt", { attempt: currAttempt.attempt + 1, letter: 0 }, {path: "/"})
      updateEmojiBoard(currWord);
    } else {
      setShowInvalid(true);
      return;
    }

    console.log(board)
    console.log(currAttempt)

    if (currWord.toLowerCase() === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      setCookies(true)
      setOpenModal(true);
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      setCookies(false)
      setOpenModal(true);
      return;
    }
  };

  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });

    setCookie("board", newBoard, {path: "/"})
    setCookie("currAttempt", { ...currAttempt, letter: currAttempt.letter - 1 }, {path: "/"})
  };

  const onSelectLetter = (key) => {
    if (currAttempt.letter > 4) return;
    const newBoard = [...board];
    
    newBoard[currAttempt.attempt][currAttempt.letter] = key;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });

    setCookie("board", newBoard, {path: "/"})
    setCookie("currAttempt", {
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    }, {path: "/"})
  };

  return (
    <div className="App">
      <TopBarWrapper>
            <TopBar setOpenInstructions={setOpenInstructions} setOpenModal={setOpenModal} gameOver={gameOver.gameOver}/>
      </TopBarWrapper>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          emojiBoard,
          setEmojiBoard,
          currAttempt,
          setCurrAttempt,
          correctWord,
          onSelectLetter,
          onDelete,
          onEnter,
          setDisabledLetters,
          disabledLetters,
          setCorrectLetters,
          correctLetters,
          setAlmostLetters,
          almostLetters,
          gameOver,
          getIndices,
          checkLikely,
          setCookie
        }}
      >
        <GameWrapper>
          <Board />
          <Keyboard />
          {openInstructions && <InstructionsPopup setOpenInstructions={setOpenInstructions} gameOver={gameOver.gameOver}/>}
          {showInvalid && <InvalidPopup />}
          {openModal && <Modal setOpenModal={setOpenModal} correctWord={correctWord} guessedWord={gameOver.guessedWord} emojiBoard={emojiBoard} setCookie={setCookie} cookies={cookies}/>}
        </GameWrapper>
      </AppContext.Provider>
    </div>
  );
}

export default App;
