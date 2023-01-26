//! need to fix, easy
//? Need to fix, hard
//* need to revisit/review

//? HOW IN THE HELL DOES ALL THE TYPING WORK EXCEPT FOR TYPING DELETE BUTTON
//? ALSO, WHY DOES CLICKING WORK FOR LETTERS BUT NOT THE BACKSPACE OR ENTER???
//? 41...CHROME CONSOLE --->I THINK IS HAS SOMETHING TO DO WITH EXPORT DEFAULT KEYBOARD
//? ...ALSO TRY GOOGLING: Each child in a list should have a unique "key" prop.
//IF YOU PRESS DELETE CHROME CONSOLE RETURNS: uncaught typeerror: ondelete is not a function
//IF YOU LOOK AT KEYBOARD.JS AT KEYBOARD-PRESS-ENTER...WHY DOES THIS WORK BUT NOT DELETE???


import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import React, { createContext, useState, useEffect } from 'react';
import { boardDefault, generateWordSet } from './Words';
import GameOver from './components/GameOver';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({attempt: 0, letterPos: 0}); //! 12
  
  const [correctWord, setCorrectWord] = useState(''); //! 14
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);

  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false});

  useEffect(() => {
    generateWordSet().then((words) => {
      // console.log(words);  
      setWordSet(words.wordSet);    //* words
      setCorrectWord(words.wordAnswer) //* words
    });
  }, []);

  const onSelectLetter = (keyVal) => { //! 60
    if (currentAttempt.letterPos > 4) return; //!61
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyVal; //! 63
    setBoard(newBoard);
    setCurrentAttempt({...currentAttempt, letterPos: currentAttempt.letterPos + 1}) //! 65
  };

  const onDelete = () => {
    if (currentAttempt.letterPos === 0) return; //! 53
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = ''; //! 55
    setBoard(newBoard);
    setCurrentAttempt({...currentAttempt, letterPos: currentAttempt.letterPos - 1}); //! 57
  };

  const onEnter = () => {
    if (currentAttempt.letterPos !== 5) return; //! 29

    let currentWord = '';
    for (let i=0; i<5; i++) {
      currentWord += board[currentAttempt.attempt][i];
    }

    if (wordSet.has(currentWord.toLowerCase())) {
      setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPos: 0}); //! 36
    } else {
      alert('Word Not Found');
    }

    if (currentWord === correctWord) {
      setGameOver({gameOver: true, guessedWord: true});
      return;
    }

    if (currentAttempt.attempt === 5) {
      setGameOver({gameOver: true, guessedWord: false})
    }
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider 
        value={{
          board, 
          setBoard, 
          currentAttempt, 
          setCurrentAttempt, 
          onSelectLetter, 
          onDelete, 
          onEnter,
          correctWord,
          setDisabledLetters,
          disabledLetters,
          gameOver,
          setGameOver //! 88
        }} 
      >
        <div className='game'>
          <Board /> 
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
