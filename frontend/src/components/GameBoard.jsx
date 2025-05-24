import React, { useState } from 'react'
import CategorySelection from './CategorySelection';

const emoji = ["🐐","🐫","🐈"];
const playerCategory = {
  1:["🐐","🐫","🐈"],
  2:["🍕", "🍟", "🍩"],
};

const GameBoard = () => {

  const [playerMoves, setPlayerMoves] = useState({
    1: [],
    2: [],
  })
  const grid = Array(3).fill(Array(3).fill(null));
  const [board, setBoard] = useState(grid);

  const [currentPlayer,setCurrentPlayer] = useState(1);
  
  const [winner, setWinner] = useState(null)
  const [Selection, setSelection] = useState(false);
  const [playerSelections, setPlayerSelections] = useState({ 1: null,2:null });
  
  
  function checkWin(board, player) {
    const positionSet = new Set();

    for (let r=0;r<3 ;r++) {
      for (let c = 0; c<3; c++) {
        if (board[r][c]?.player === player) {
          positionSet.add(`${r},${c}`);
        }
      }
    }

    const winCombos = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];

    return winCombos.some(combination=>
      combination.every(([r, c]) => positionSet.has(`${r},${c}`))
    );
  }

  function resetGame() {
  setBoard(Array(3).fill(Array(3).fill(null)));
  setPlayerMoves({ 1: [], 2: [] });
  setCurrentPlayer(1);
  setWinner(null);
  }

  function home(){
    setBoard(Array(3).fill(Array(3).fill(null)));
    setPlayerMoves({ 1: [], 2: [] });
    setCurrentPlayer(1);
    setWinner(null);
    setPlayerSelections({ 1: null,2:null })
    setSelection(false);
    
  }

  function handleClick(rowIdx,colIdx){
    if (board[rowIdx][colIdx] || winner) return;

    
    const newboard = board.map(row=>[...row]);
    const newMoves = {...playerMoves};
    
    const emojiPlayer = playerSelections[currentPlayer]
    const randomEmoji  = emojiPlayer[Math.floor(Math.random()* emoji.length)];
    
    
    if(newMoves[currentPlayer].length === 3){
      const [oldRow,oldCol] = newMoves[currentPlayer][0]
      newboard[oldRow][oldCol] = null;
      newMoves[currentPlayer].shift();
    }
    
    newboard[rowIdx][colIdx] = 
    {
      player: currentPlayer,
      emoji: randomEmoji,
    };
    newMoves[currentPlayer].push([rowIdx,colIdx]);
    
    console.log(newMoves);
    setBoard(newboard);
    setPlayerMoves(newMoves);

    if (checkWin(newboard,currentPlayer)){
      setWinner(currentPlayer);
      console.log(currentPlayer)
    }

    setCurrentPlayer(currentPlayer=== 1 ? 2 : 1);

    console.log(winner)

  }

  if (!Selection){
    const currentSelectingPlayer = playerSelections[1] ? 2 : 1;
    return (
      <>
        <CategorySelection 
          player={currentSelectingPlayer}
          emojiSelect={(emojis) => {
            setPlayerSelections(prev => ({...prev,[currentSelectingPlayer]: emojis}));
            
            if (playerSelections[1] && currentSelectingPlayer === 2) {
              setSelection(true);
            }
          }}
        />
      </>
    )
  }

  return (
   <>

   
   
    <div className='grid grid-cols-3 gap-5'>
      
        {board.map((row,rowIdx)=>(
          row.map((item,colIdx)=>(
                  <div key={`${rowIdx}-${colIdx}`} onClick={()=>handleClick(rowIdx,colIdx)} className="w-20 h-20 bg-white border-2 border-gray-400 rounded-lg flex items-center justify-center text-5xl">{item?.emoji}</div>
              )
            )
        ))}
    </div>
    


{winner
? 
( 
  
  <div className="mt-4 text-center space-x-5">
    <h2 className="text-xl font-bold mb-2 text-green-600">🎉 Player {winner} Wins!</h2>
    <button 
      onClick={home}
      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
      Home
    </button>
    <button 
      onClick={resetGame}
      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
      Play Again
    </button>
  </div>
  
)
:
(
  <div className="text-center mt-4 space-x-4">
    <button 
      onClick={home}
      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
      Home
    </button>
    <button
      onClick={resetGame}
      className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg'
    >
      Reset
    </button>
  </div>
)
}
   </>
  )
}

export default GameBoard

