import wordBank from './word-bank.txt';

export const boardDefault = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
];

export const generateWordSet = async() => {
  let wordSet;

  await fetch(wordBank)
    .then((response) => response.text())
    // .then((response) => {response.text()}) //! NOT SURE WHY BUT THIS WONT WORK IF YOU ADD CURLY BRACES...
    .then((result) => {
      // console.log(result);
      const wordArray = result.split('\r\n');
      wordSet = new Set(wordArray); //sets have (O)1 time complexity for 'includes' function vs array is log(N)
      // console.log(wordSet);    
    });

  return {wordSet} //NOTE THAT THIS RETURNS AN OBJECT
};

