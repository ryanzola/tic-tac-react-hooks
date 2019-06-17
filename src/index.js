import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square({value, onClick}) {
  return (
    <button 
      className="square"
      onClick={onClick}>
      {value}
    </button>
  );
}

function Board(props) {
  console.log('board: ', props.board);
  return (
    <div className="board">
        {props.board.map((row, i) => (
          <div key={i} className="board-row">
            {row.map((col, j) => (
              <Square key={j} value={col} onClick={() => props.handleClick(i, j)}/>
            ))}
          </div>
        ))}
    </div>
  );
}

function Game() {
  const X = 'X'
  const O = 'O'
  const [board, setBoard] = useState([
    Array(3).fill(null),  
    Array(3).fill(null),    
    Array(3).fill(null),    
  ]);
  const [isXNext, setIsXNext] = useState(true);
  const status = `Next player: ${ isXNext ? X : O }`;
  const [patterns, setPatterns] = useState({[X]: 0, [O]: 0})
  const [winner, setWinner] = useState(null)

function handleClick(i, j) {
  const nextBoard = board.slice();
  nextBoard[i][j] = isXNext ? X : O
  setBoard(nextBoard);
  setIsXNext(!isXNext);

  // Add the value to the player pattern using bitwise OR
  // @TODO: use setPattern or decouple
  patterns[nextBoard[i][j]] = patterns[nextBoard[i][j]] |= Math.pow(2,(i*3+j));
}



useEffect(() => {
  console.log(patterns);

  function checkForWin(patterns) {
    /* The following array holds all the possible 
    * winning combinations for the game. Using 
    * bitwise arithmatic, each cell is represented 
    * by 2 to the power of the cell's number 
    * (2^0,2^1,2^2, ... , 2^8). The winning 
    * combination is the sum of all the numbers 
    * in the corresponding cells (can also be 
    * achieved by OR-ing two numbers). For example,
    * the winning combination for the first row is
    * 1+2+4 = 7. These patterns are compared with
    * each player's pattern by using bitwise AND.
    * if the result of the AND operation is equal 
    * to the winning pattern, that player is the winner.
    */
    const WINNING_PATTERNS = [
      7, 56, 448,	  // Horizontal
      73, 146, 292,	// Vertical
      273, 84			  // Cross
    ];

    // Loop through all possible winning sets
    for(let i = 0; i < WINNING_PATTERNS.length; i++) {
      // Use bitwise AND to determind if the player's score
      // Holds a winning combination
      if((WINNING_PATTERNS[i] & patterns[X]) === WINNING_PATTERNS[i])
        return X;
      if((WINNING_PATTERNS[i] & patterns[O]) === WINNING_PATTERNS[i])
        return O;
    }
    // No winner
    return null;
  }

  setWinner(checkForWin(patterns))
  console.log('winner: ', winner);
}, [patterns, board, winner])



  return (
    <div className="game">
      <div className="game-board">
        <div className="status">{status}</div>
        <Board board={board} handleClick={handleClick}/>
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
