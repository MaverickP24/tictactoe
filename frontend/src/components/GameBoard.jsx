import React, { useEffect, useRef, useState } from 'react'
import CategorySelection from './CategorySelection';
import AnimatedTitle from './AnimatedTitle';
import gsap from 'gsap';

const emoji = ["🐐","🐫","🐈"];
const playerCategory = {
  1:["🐐","🐫","🐈"],
  2:["🍕", "🍟", "🍩"],
};

const GameBoard = () => {
  const [showWinnerScreen, setShowWinnerScreen] = useState(false);
  const winnerScreenRef = useRef(null);

  
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
  const [score, setscore] = useState({1:0,2:0})
  const clickAudio = new Audio('/clickSound.wav');
  const [winningLine, setWinningLine] = useState(null);
  
  useEffect(() => {
    if (showWinnerScreen && winnerScreenRef.current) {
      gsap.fromTo(
        winnerScreenRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
  }, []);
  
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

    for (const combo of winCombos) {
    if (combo.every(([r, c]) => positionSet.has(`${r},${c}`))) {
      return combo;
    }
  }

  return null;
  }

  function resetGame() {
  setBoard(Array(3).fill(Array(3).fill(null)));
  setPlayerMoves({ 1: [], 2: [] });
  setCurrentPlayer(1);
  setMovesCount(0);
  setWinner(null);
  clickAudio.currentTime = 0;
  clickAudio.play();
  setShowWinnerScreen(false);
  setWinningLine(null)
  
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
  setscore({1:0,2:0})
   setShowWinnerScreen(false);
  setWinningLine(null)
    
  }

  function getCellCenter([row, col]) {
    const cellSize = 128; // Approx for md:w-40 (adjust if needed)
    const gap = 20;        
    const x = col * (cellSize + gap) + cellSize / 2;
    const y = row * (cellSize + gap) + cellSize / 2;
    return [x, y];
  }

  function handleClick(rowIdx, colIdx) {
    if (board[rowIdx][colIdx] || winner) return;

    clickAudio.play();

    const newboard = board.map(row => [...row]);
    const newMoves = { ...playerMoves };

    const emojiPlayer = playerSelections[currentPlayer];
    const randomEmoji = emojiPlayer[Math.floor(Math.random() * 10)];

    if (newMoves[currentPlayer].length === 3) {
      const [oldRow, oldCol] = newMoves[currentPlayer][0];
      newboard[oldRow][oldCol] = null;
      newMoves[currentPlayer].shift();
    }

    newboard[rowIdx][colIdx] = {
      player: currentPlayer,
      emoji: randomEmoji,
    };
    newMoves[currentPlayer].push([rowIdx, colIdx]);

    setBoard(newboard);
    setPlayerMoves(newMoves);

    const winCombo = checkWin(newboard, currentPlayer);
    if (winCombo) {
      setWinner(currentPlayer);
      setWinningLine(winCombo);
      setscore(prev => ({
        ...prev,
        [currentPlayer]: prev[currentPlayer] + 1,
      }));
      setTimeout(() => {
        setShowWinnerScreen(true);
      }, 1500);
    }

    setMovesCount(prev => prev + 1);
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
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
          <div className="flex"><div className="text-center text-2xl py-1 px-3 mb-3 border-2 rounded-lg m-auto bg-amber-600">Total Moves : {MovesCount}</div></div>
          
          <div className="relative">
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
                      ? 'bg-[rgba(37,99,235,0.3)]'
                      : 'bg-[rgba(37,99,235,0.3)]'
                    : item?.player === 2
                    ? isOldest
                      ? 'bg-[rgba(220,38,38,0.5)]'
                      : 'bg-[rgba(220,38,38,0.5)]'
                    : '';

                return (
                  <>
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    onClick={() => handleClick(rowIdx, colIdx)}
                    className={`w-20 h-20 md:w-40 md:h-40 border-2 border-gray-400 rounded-lg flex items-center justify-center md:text-7xl text-5xl  ${baseColor ? baseColor : "bg-[rgba(255,251,235,0.3)]"} 
                      ${!item && (currentPlayer === 1? "hover:border-blue-500" : "hover:border-red-500")}`}
                  >
                    <div>{item?.emoji}</div>
                  </div>
                  </>
                );
              })
            )}

            

            

          </div>
          {winningLine && (
              <svg className="absolute top-15 left-12 w-full h-full pointer-events-none">
                <line
                  x1={getCellCenter(winningLine[0])[0]}
                  y1={getCellCenter(winningLine[0])[1]}
                  x2={getCellCenter(winningLine[2])[0]}
                  y2={getCellCenter(winningLine[2])[1]}
                  stroke={winner === 1 ? "#3B82F6" : "#EF4444"}
                  strokeWidth="10"
                  strokeLinecap="round"
                  className="animate-draw-line"
                />
              </svg>
            )}
          </div>
      </div>

{/* <div className="text-center w-40 h-70 border-gray-400 border-2 m-20 ">hii</div> */}

   </div>
    


{winner && showWinnerScreen
? 
( 
  
  <div className="mt-4 text-center space-x-5 bg-[url('/background.jpg')] bg-cover bg-center w-screen min-h-screen absolute left-0 -top-4 p-10">
          <AnimatedTitle
            title={`B l i <b>n</b> k T<b>A</b>c T<b>o</b>e`}
            containerClass="text-[10vw] pt-10 md:pt-0 md:text-[7vw] text-[#DFDFF0] text-center pb-10 hero-heading special-font"
          />
    <h2 className="md:text-3xl text-xl font-bold mb-2 text-green-600 ">Congratulations</h2>
    <h2 className='md:text-3xl text-xl  text-fuchsia-100 py-6'>Player
      <br/>
      <div className="text-[12vw]">{winner}</div>
      Wins
    </h2>

    <div className="flex justify-center items-center space-x-20  mt-5 text-4xl text-amber-50">
      <div className="flex flex-col gap-3">
        <h1 className="text-center md:text-4xl text-2xl  text-amber-50">Player 1</h1>
        <h2 className='md:text-4xl text-2xl text-amber-800'>{score[1]}</h2>
      </div>
      <div>:</div>
      <div className="flex flex-col  gap-3">
        <h1 className="text-center md:text-4xl text-2xl text-amber-50">Player 2</h1>
        <h2 className='md:text-4xl text-2xl text-amber-800'>{score[2]}</h2>
      </div>
    </div>

    <div className="flex"><div className="text-center text-2xl py-1 px-3 my-10 border-2 rounded-lg m-auto bg-amber-600">Total Moves : {MovesCount}</div></div>

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

