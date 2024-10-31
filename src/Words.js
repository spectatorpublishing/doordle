import wordBank from "./wordle-bank-full.txt";
import foodWordBank from "./wordle-bank-food.txt";
import foodWordBankRand from "./wordle-bank-food-rand.txt";

export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

// TO DO: before launch, update with date the site goes live
const LAUNCH_DATE = new Date("October 30, 2024 00:00:00");

export const generateWordSet = async () => {
  let wordSet;
  let todaysWord;
  await fetch(wordBank)
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
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const validWordsArr = result.split("\n");
      wordSet = new Set(validWordsArr);
    });
  
  await fetch(foodWordBankRand)
    .then((response) => response.text())
    .then((result) => {
      const guessWordsArr = result.split("\n");
      let todaysDate = new Date();
      let halfDaysElapsed = (todaysDate.getTime() - LAUNCH_DATE.getTime()) / (1000 * 60 * 60 * 24)
      todaysWord = guessWordsArr[Math.floor(halfDaysElapsed)];
    });
  return { wordSet, todaysWord };
};
