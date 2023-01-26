import React, {useContext} from 'react';
import { AppContext } from '../App';

function Key({keyVal, bigKey, disabled }) {
  const { onSelectLetter, OnDelete, OnEnter, gameOver } = useContext(AppContext);

  const selectLetter = () => {
    if (gameOver.gameOver) return;

    if (keyVal === 'ENTER') {
      OnEnter()
    } else if (keyVal === 'DELETE') {
      OnDelete()
    } else {
      onSelectLetter(keyVal)
    }
  }; 

  return (
    <div 
    className='key' 
    id={bigKey ? 'big' : disabled && 'disabled'} //* if bigkey then set id='big else if disabled id=disabled
    onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
}

export default Key;