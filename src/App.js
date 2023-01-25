//? HOW IN THE HELL DOES ALL THE TYPING WORK EXCEPT FOR TYPING DELETE BUTTON
//? ALSO, WHY DOES CLICKING WORK FOR LETTERS BUT NOT THE BACKSPACE OR ENTER???
//? 41...CHROME CONSOLE --->I THINK IS HAS SOMETHING TO DO WITH EXPORT DEFAULT KEYBOARD
//? ...ALSO TRY GOOGLING: Each child in a list should have a unique "key" prop.
//IF YOU PRESS DELETE CHROM CONSOLE RETURNS: uncaught typeerror: ondelete is not a function
//IF YOU LOOK AT KEYBOARD.JS AT KEYBOARD-PRESS-ENTER...WHY DOES THIS WORK BUT NOT DELETE???


import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import React, { createContext, useState, useEffect } from 'react';
import { boardDefault, generateWordSet } from './Words';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({attempt: 0, letterPos: 0});
  
  const [wordSet, setWordSet] = useState(new Set());
  const correctWord = 'RIGHT';

  useEffect(() => {
    generateWordSet().then((words) => {
      console.log(words);  
      setWordSet(words.wordSet);    
    });
  }, []);

  const onSelectLetter = (keyVal) => {
    if (currentAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrentAttempt({...currentAttempt, letterPos: currentAttempt.letterPos + 1})
  };

  const onDelete = () => {
    if (currentAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = '';
    setBoard(newBoard);
    setCurrentAttempt({...currentAttempt, letterPos: currentAttempt.letterPos - 1});
  };

  const onEnter = () => {
    if (currentAttempt.letterPos !== 5) return;

    let currentWord = '';
    for (let i=0; i<5; i++) {
      currentWord += board[currentAttempt.attempt][i];
    }

    if (wordSet.has(currentWord.toLowerCase())) {
      setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPos: 0});
    } else {
      alert('Word Not Found');
    }

    if (currentWord === correctWord) {
      alert('You Win');
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
        }} 
      >
        <div className='game'>
          <Board /> 
          <Keyboard />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
