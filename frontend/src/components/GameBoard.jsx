import React, { useEffect, useRef, useState } from 'react'
import CategorySelection from './CategorySelection';
import AnimatedTitle from './AnimatedTitle';
import gsap from 'gsap';
import "../index.css"

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
  const winAudio = new Audio('/win.wav');
  const startAudio = new Audio('/start.mp3');
  const [winningLine, setWinningLine] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showRules, setShowRules] = useState(false);
  
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
  setGameStarted(false);
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
      winAudio.play()
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

 if (!gameStarted) {
    return (
      <div className="text-center flex flex-col space-y-5 justify-center  items-center">
        <button
          onClick={() => {
            startAudio.play();
            setGameStarted(true);
          }}
          className="bg-[rgba(37,99,235,0.3)] hover:bg-[rgba(37,99,235,0.5)] border border-1 text-white text-lg px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
        >
          Start Game
        </button>

        <button
          onClick={() => setShowRules(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-black text-md px-4 py-2 rounded-md shadow transition-all duration-300"
        >
          How to Play
        </button>

        {showRules && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg max-w-lg w-full relative mx-4 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">🎮 How to Play</h2>
            <ul className="list-disc list-inside space-y-4 text-left text-lg">
              <li>
                <strong>Pick Emoji Categories</strong><br />
                Each player chooses a category (like 🐶 Animals or 🍕 Food). You'll get random emojis from your category.
              </li>
              <li>
                <strong>🔁 Take Turns</strong><br />
                Player 1 starts. Players alternate placing their emoji in any empty cell on the 3x3 grid.
              </li>
              <li>
                <strong>✨ Vanishing Rule</strong><br />
                You can only have 3 emojis on the board. Placing a 4th? Your oldest one vanishes (but you can’t place on the vanished spot).
              </li>
              <li>
                <strong>🏆 Win the Game</strong><br />
                Line up 3 of your emojis (same category) horizontally, vertically, or diagonally.
              </li>
            </ul>
            <button
              onClick={() => setShowRules(false)}
              className="absolute top-2 right-3 text-gray-700 hover:text-red-600 text-xl"
            >
              ✖
            </button>
          </div>
        </div>
      )}
      </div>
    );
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
          <div className="flex">
            <div className="text-center text-2xl py-1 px-3 mb-3 border-2 rounded-lg m-auto bg-amber-600">Total Moves : {MovesCount}</div>
          </div>

          <div className="flex justify-center gap-6 mb-4">
            <div className={`px-6 py-2 rounded-xl text-lg font-semibold transition-all duration-300 ${currentPlayer === 1 ?"bg-blue-600 text-amber-50 stroke-1 stroke-black shadow-lg scale-105" : "bg-gray-200"}`}>Player 1</div>
              <div className={`px-6 py-2 rounded-xl text-lg font-semibold transition-all duration-300 ${currentPlayer === 2 ? "bg-red-600 text-amber-50 stroke-1 stroke-black shadow-lg scale-105" : "bg-gray-200"}`}>Player 2</div>
          </div>
          
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
                      className={`w-20 h-20 md:w-35 md:h-35 border-2 border-gray-400 rounded-lg flex items-center justify-center md:text-7xl text-5xl  ${baseColor ? baseColor : "bg-[rgba(255,251,235,0.3)]"} 
                        ${!item && (currentPlayer === 1? "hover:border-blue-500" : "hover:border-red-500")}`}
                    >
                      <div className={`fade-emoji`}>{item?.emoji}</div>
                    </div>
                    </>
                  );
                })
              )}
            </div>
              {winningLine && (
                  <svg className="absolute md:top-10 md:left-7 -top-10 -left-16 w-full h-full pointer-events-none">
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

   </div>
    


{winner && showWinnerScreen

? 
( 
  
  <div className="mt-5 md:mt-0 text-center space-x-5 bg-[url('/background.jpg')] bg-cover bg-center w-screen min-h-screen absolute left-0 -top-4 p-10 flex justify-center flex-col items-center">
      <AnimatedTitle
        title={`B l i <b>n</b> k - T<b>A</b>c - T<b>o</b>e`}
        containerClass="text-[10vw] pt-5 md:pt-0 md:text-[7vw] text-[#DFDFF0] text-center pb-0 hero-heading special-font"
      />
    <div className="bg-[rgba(255,255,255,0)] ">
      <h2 className="md:text-3xl text-xl font-bold text-green-600 ">Congratulations</h2>
      <h2 className='md:text-3xl text-xl  text-fuchsia-100 py-6'>Player
        <br/>
          <div className="text-[12vw]">{winner}</div>
        Wins
      </h2>

      <div className="flex justify-center items-center space-x-20  mt-5 text-4xl text-amber-50">
        <div className="flex flex-col gap-3 bg-[#262222a2] py-4 px-2 border-1 ">
          <h1 className="text-center md:text-4xl text-2xl  text-amber-50">Player 1</h1>
          <h2 className='md:text-4xl text-2xl text-amber-800'>{score[1]}</h2>
        </div>
        <div>:</div>
        <div className="flex flex-col bg-[#262222a2] gap-3 py-4 px-2 border-1">
          <h1 className="text-center md:text-4xl text-2xl text-amber-50">Player 2</h1>
          <h2 className='md:text-4xl text-2xl text-amber-800'>{score[2]}</h2>
        </div>
      </div>

    </div>
    <div className="flex"><div className="text-center text-2xl py-1 px-3 my-10 border-2 rounded-lg m-auto bg-amber-600">Total Moves : {MovesCount}</div></div>

    <div className="flex space-x-6">
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

