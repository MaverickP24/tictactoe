import React from 'react'
import GameBoard from './components/GameBoard'

const App = () => {
  return (
    <>
      <div className="min-h-screen w-screen flex items-center justify-center bg-[url('/background.jpg')] bg-cover bg-center">

        <div>
          <h1 className="text-8xl text-[#DFDFF0] text-center pb-10 hero-heading special-font ">Bli<b>n</b>k T<b>A</b>c T<b>o</b>e</h1>

          <GameBoard />
        </div>
        


    </div>
    </>
  )
}

export default App
