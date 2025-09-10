import React, { useEffect, useState } from 'react';
import './App.css';
import Cell from './components/Cell/Cell';

function App() {
  type Player = "X" | "O" | null;
  const [board, setBoard] = useState<string[]>(Array(9).fill(null));

  const [playerCharachter, setPlayerCharachter] = useState<Player>(null);
  const [computerCharachter, setComputerCharachter] = useState<Player>(null);
  const [isPlayerSelected, setIsPlayerSelected] = useState<boolean>(false);
  const [currentUserTurn, setCurrentUserTurn] = useState<Player>(null);

  const onSelectPlayer = (selection: Player) => {
    setPlayerCharachter(selection);
    if (selection === "X") setComputerCharachter("O");
    else if (selection === "O") setComputerCharachter("X");
    setIsPlayerSelected(true);
    setCurrentUserTurn(playerCharachter);
  };

  const checkWin = () => {
    const size = 3; 
    for( let i=0; i<size; i++){
      if(board[i * size] && board[i* size] === board[i * size + 1] && board[i * size] === board[i* size + 3]) return board[i * size];
      if(board[i] && board[i] === board[i + size] && board[i] === board[i + 2 * size] ) return board[i];

    }
    if(board[0] && board[0] === board[4] && board[0] === board[8]) return board[0];
    if(board[2] && board[2] === board[4] && board[0] === board[6]) return board[2];
    let availableSpaces = board.filter(i => i === null);
    console.log(availableSpaces);
    if(availableSpaces.length === 0) return "D";
    
    return null;
  }

  useEffect(() => {
    const result = checkWin();
    if(result !== null && result !== "D"){
      alert(`${result} has won!`);
      clearBoard();
    } else if(result === "D"){
      alert(`It was a draw!`);
      clearBoard();
    }
  }, [board]);

  const clearBoard = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerSelected(false);
  }
  const changeTurn = (index: number) => {
    if(board[index] !== null) return;
    let newBoard = [...board];
    if (newBoard) newBoard[index] = playerCharachter as string;
    //Now once the board has been updated with the players selection, we want the computer to take a turn
    let availableSpaces = newBoard.reduce<number[]>((acc, val, i) => {
      if (val == null) acc.push(i);
      return acc;
    }, []);
    const randomIndex = availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
    newBoard[randomIndex] = computerCharachter as string;
    setBoard(newBoard);
  }

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <h2>Select Player</h2>
      {!isPlayerSelected && (
        <div>
          <button onClick={() => onSelectPlayer("X")}>X</button>
          <button onClick={() => onSelectPlayer("O")}>O</button>
        </div>
      )}

      <div className="grid">
        {
          board?.map((cellValue, i) => (
            <Cell key={i} index={i} value={board ? board[i] : null} currentPlayer={playerCharachter} currentUserTurn={currentUserTurn} changeTurn={changeTurn}></Cell>
          ))
        }
      </div>

    </div>
  );
}

export default App;
