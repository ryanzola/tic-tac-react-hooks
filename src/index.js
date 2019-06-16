import React, { useState } from 'react';
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

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  function renderSquare(i) {
    return <Square 
      onClick={() => {
        const nextSquare = squares.slice();
        nextSquare[i] = isXNext ? 'x' : 'o'
        console.log(nextSquare);
        setSquares(nextSquare);
        setIsXNext(!isXNext);
        }
      }
      value={squares[i]}/>;
  }

  const status = 'Next player: X';

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
