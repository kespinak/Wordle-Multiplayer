import { Clue } from "./clue";
import { Row, RowState } from "./Row";
import { gameName, maxGuesses } from "./util";

export function About() {
  return (
    <div className="App-about">
      <p>
        <i>{gameName}</i> is a remake of the word game{" "}
        <a href="https://www.nytimes.com/games/wordle/index.html">
          <i>Wordle</i>
        </a>{" "}
      </p>
      <p>
        You get {maxGuesses} tries to guess a target word.
        <br />
        After each guess, you get clues to the answer.
      </p>
      <hr />
    </div>
  );
}
