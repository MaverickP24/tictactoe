import React, { useState } from 'react'

const emoji = ["🐐","🐫","🐈"];

const GameBoard = () => {

    const grid = Array(3).fill(Array(3).fill(null));
  const [board, setBoard] = useState(grid);

  function handleClick(rowIdx,colIdx){
    if (board[rowIdx][colIdx]) return;
    const newboard = board.map(row=>[...row]);
    const randomemoji  = emoji[Math.floor(Math.random()* emoji.length)];
    newboard[rowIdx][colIdx] = randomemoji;
    setBoard(newboard);


  }

  return (
    <div className='grid grid-cols-3 gap-5'>
        {board.map((row,rowIdx)=>(
          row.map((item,colIdx)=>(
                  <div key={`${rowIdx}-${colIdx}`} onClick={()=>handleClick(rowIdx,colIdx)} className="w-20 h-20 bg-white border-2 border-gray-400 rounded-lg flex items-center justify-center text-2xl">{item}</div>
                
              )
            )
        ))}
      
    </div>
  )
}

export default GameBoard


