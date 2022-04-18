import wordBank_guesses from "./wordle-bank-food-rand.txt";
import wordBank_valid from "./wordle-bank.txt";

export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

// TO DO: before launch, update with date the site goes live
const LAUNCH_DATE = new Date("April 18, 2022 00:00:00");

export const generateWordSet = async () => {
  let wordSet;
  let todaysWord;
  await fetch(wordBank_valid)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split("\n");
      todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
      wordSet = new Set(wordArr);
    });
  return { wordSet, todaysWord };
};

export const generateTimedWordSet = async () => {
  let wordSet;
  let todaysWord;
  await fetch(wordBank_valid)
    .then((response) => response.text())
    .then((result) => {
      const validWordsArr = result.split("\n");
      wordSet = new Set(validWordsArr);
    });
  
  await fetch(wordBank_guesses)
    .then((response) => response.text())
    .then((result) => {
      const guessWordsArr = result.split("\n");
      let todaysDate = new Date();
      let halfDaysElapsed = (todaysDate.getTime() - LAUNCH_DATE.getTime()) / (1000 * 60 * 60 * 12)
      todaysWord = guessWordsArr[Math.floor(halfDaysElapsed)];
    });
  return { wordSet, todaysWord };
};
