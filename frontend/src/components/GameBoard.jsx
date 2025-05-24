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
  const [MovesCount, setMovesCount] = useState(0)
  const clickAudio = new Audio('/clickSound.wav');
  
  
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
  setMovesCount(0);
  setWinner(null);
  clickAudio.currentTime = 0;
  clickAudio.play();
}

function home(){
  setBoard(Array(3).fill(Array(3).fill(null)));
  setPlayerMoves({ 1: [], 2: [] });
  setCurrentPlayer(1);
  setMovesCount(0);
    setWinner(null);
    setPlayerSelections({ 1: null,2:null })
    setSelection(false);
  clickAudio.play();
  clickAudio.currentTime = 0;
    
  }

  function handleClick(rowIdx,colIdx){
    if (board[rowIdx][colIdx] || winner) return;

    clickAudio.play()


    const newboard = board.map(row=>[...row]);
    const newMoves = {...playerMoves};
    
    const emojiPlayer = playerSelections[currentPlayer]
    const randomEmoji  = emojiPlayer[Math.floor(Math.random()* 10)];
    
    
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
    setMovesCount((prev)=>(prev+1))
    setCurrentPlayer(currentPlayer=== 1 ? 2 : 1);

    console.log(winner)

  }

  if (!Selection){
    const currentSelectingPlayer = playerSelections[1] ? 2 : 1;
    return (
      <>
        <CategorySelection 
          player={currentSelectingPlayer}
          playerSelections ={playerSelections}
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

   <div className="flex justify-center items-center">
    {/* <div className="text-center w-40 h-70 border-gray-400 border-2 m-20 ">hii</div> */}

        <div>
          <div className="text-center font-bold">Moves : {MovesCount}</div>
          
          <div className='grid grid-cols-3 gap-5'>
            
            {board.map((row, rowIdx) =>
              row.map((item, colIdx) => {
                const isOldest =
                  item?.player &&
                  playerMoves[item.player]?.[0]?.[0] === rowIdx &&
                  playerMoves[item.player]?.[0]?.[1] === colIdx &&
                  playerMoves[item.player]?.length === 3;

                const baseColor =
                  item?.player === 1
                    ? isOldest
                      ? 'bg-blue-300'
                      : 'bg-blue-600'
                    : item?.player === 2
                    ? isOldest
                      ? 'bg-red-300'
                      : 'bg-red-600'
                    : '';

                return (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    onClick={() => handleClick(rowIdx, colIdx)}
                    className={`w-20 h-20 md:w-40 md:h-40 border-2 border-gray-400 rounded-lg flex items-center justify-center text-7xl  ${baseColor} 
                      ${!item && (currentPlayer === 1? "hover:border-blue-500" : "hover:border-red-500")}`}
                  >
                    <div>{item?.emoji}</div>
                  </div>
                );
              })
            )}
          </div>
      </div>

{/* <div className="text-center w-40 h-70 border-gray-400 border-2 m-20 ">hii</div> */}

   </div>
    


{winner
? 
( 
  
  <div className="mt-4 text-center space-x-5 bg-black w-screen h-screen absolute left-0 -top-4">
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

