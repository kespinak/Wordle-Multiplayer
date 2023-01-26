import React, { useContext, useEffect } from 'react';
import { AppContext } from '../App';

function Letter({ letterPos, attemptVal }) {
  const { board, correctWord, currentAttempt, setDisabledLetters } = useContext(AppContext);
  const letter = board[attemptVal][letterPos];

  const correct = correctWord.toUpperCase()[letterPos] === letter; //? console.log(correctWord) outputs undefined...
  const almost = !correct && letter !== '' && correctWord.toUpperCase().includes(letter);
  const letterState = currentAttempt.attempt > attemptVal && (correct ? 'correct' : almost ? 'almost' : 'error');

  useEffect(() => {
    if (letter !== '' && !correct && !almost) {
      // console.log(letter)
      setDisabledLetters((prev) => [...prev, letter]); //* GET THE PREVIOUS STATE VIA A FUNCTION AND THEN UPDATE IT
    };
  }, [currentAttempt.attempt]);


  return (
    <div className='letter' id={letterState} >
      {letter}
    </div>
  );
}

export default Letter;