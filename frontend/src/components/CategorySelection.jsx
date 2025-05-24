import React from 'react'

const click = new Audio("/clickSound.wav")
const emojiCategory = {
  Animals: ["🦁", "🐯", "🐼", "🐶", "🐱", "🐰", "🐸", "🦊", "🐻", "🐨"],
  Food: ["🍔", "🍕", "🥤", "🍟", "🍩", "🍪", "🍗", "🍎", "🍇", "🍣"],
  Objects: ["📱", "📺", "📚", "💡", "🖊️", "💻", "📷", "📦", "🕰️", "🧸"],
  Nature: ["🌞", "🌴", "🌻", "🌧️", "🌈", "🌊", "🌵", "🍁", "🌼", "❄️"],
  Sports: ["🏀", "🏈", "🏊", "⚽", "🎾", "🏓", "🏸", "🥊", "🏒", "⛷️"],
  Travel: ["🗺️", "🛫️", "🛬️", "🚗", "🚆", "🚢", "🚁", "🛳️", "🏝️", "🗽"]
};
const CategorySelection = ({emojiSelect,player}) => {
  return (
    <div>
      <div className="text-center">
        <h2 className='mb-5'>Player {player} Choose a Emoji !</h2>
        <div className="text-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {Object.entries(emojiCategory).map(([category, emojis]) => (
          <button
            key={category}
            className=" border-2 border-gray-400 rounded-lg px-6 py-4 text-lg"
            onClick={() => {
              click.play();
              emojiSelect(emojis)}}
          >
            {category}
          </button>
        ))}
      </div>
      </div>
    </div>
  )
}

export default CategorySelection
