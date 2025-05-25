import React from 'react'
import GameBoard from './components/GameBoard'
import AnimatedTitle from './components/AnimatedTitle'

const App = () => {
  return (
    <>
      <div className="min-h-screen w-screen flex items-center justify-center bg-[url('/background.jpg')] bg-cover bg-center">

        <div>
          
          <AnimatedTitle
            title={`B l i <b>n</b> k T<b>A</b>c T<b>o</b>e`}
            containerClass="text-[14vw] md:text-[8vw] text-[#DFDFF0] text-center pb-10 hero-heading special-font"
          />

          <GameBoard />
        </div>
        


    </div>
    </>
  )
}

export default App
