import React from 'react'

const GameBoard = () => {
  const grid = Array(3).fill(Array(3).fill(null));
  return (
    <div className='grid grid-cols-3 gap-5'>
        {grid.map((row,rowIdx)=>(
          row.map((col,colIdx)=>(
              
                
                  <div key={`${rowIdx}-${colIdx}`} className="w-20 h-20 bg-white border-2 border-gray-400 rounded-lg flex items-center justify-center text-2xl">0</div>
                
              )
            )
        ))}
      
    </div>
  )
}

export default GameBoard


