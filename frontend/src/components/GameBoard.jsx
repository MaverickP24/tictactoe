import React, { useState } from 'react'

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
  
  
  
  function handleClick(rowIdx,colIdx){
    if (board[rowIdx][colIdx]) return;

    const newboard = board.map(row=>[...row]);
    const newMoves = {...playerMoves};

    const emojiPlayer = playerCategory[currentPlayer]
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
    setCurrentPlayer(currentPlayer=== 1 ? 2 : 1);


  }

  return (
   <>
   
    <div className='grid grid-cols-3 gap-5'>
      
        {board.map((row,rowIdx)=>(
          row.map((item,colIdx)=>(
                  <div key={`${rowIdx}-${colIdx}`} onClick={()=>handleClick(rowIdx,colIdx)} className="w-20 h-20 bg-white border-2 border-gray-400 rounded-lg flex items-center justify-center text-2xl">{item?.emoji}</div>
              )
            )
        ))}
      
    </div>
    <div className="text-center">
      <h2 className="mt-4 text-lg">Player {currentPlayer} Turn ({currentPlayer === 1 ? "🐶🐱🐭" : "🍕🍟🍩"})</h2>
    </div>
   </>
  )
}

export default GameBoard

