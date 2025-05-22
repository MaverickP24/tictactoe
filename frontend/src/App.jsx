import React from 'react'
import GameBoard from './components/GameBoard'

const App = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <h1 className="text-4xl text-center pb-10">Blink Tac Toe</h1>
          <GameBoard />
        </div>
    </div>
    </>
  )
}

export default App
