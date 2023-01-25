import React, {useContext} from 'react'
import { AppContext } from '../App'

function Key({keyVal, bigKey}) {
  const { onSelectLetter, OnDelete, OnEnter} = useContext(AppContext);

  const selectLetter = () => {
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
    id={bigKey && 'big'} 
    onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
}

export default Key;