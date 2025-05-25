import React from 'react';

const click = new Audio('/clickSound.wav');

const emojiCategory = {
  Animals: ["🦁", "🐯", "🐼", "🐶", "🐱", "🐰", "🐸", "🦊", "🐻", "🐨"],
  Food: ["🍔", "🍕", "🥤", "🍟", "🍩", "🍪", "🍗", "🍎", "🍇", "🍣"],
  Objects: [ "📦","📺", "📱", "📚", "💡", "🖊️", "💻", "📷", "🕰️", "🧸"],
  Nature: ["🌞", "🌴", "🌻", "🌧️", "🌈", "🌊", "🌵", "🍁", "🌼", "❄️"],
  Sports: ["🏀", "🏈", "🏊", "⚽", "🎾", "🏓", "🏸", "🥊", "🏒", "⛷️"],
  Travel: ["🗺️", "🛫️", "🛬️", "🚗", "🚆", "🚢", "🚁", "🛳️", "🏝️", "🗽"]
};

const CategorySelection = ({ emojiSelect, player, playerSelections }) => {
  const takenCategory = Object.values(playerSelections).find((val) => val !== null);

  return (
    <div className='text-white'>
      <div className="text-center">
        <h1 className="text-center special-font font-bold uppercase text-4xl ">Player {player}</h1>
        <h2 className='text-3xl mb-10'>choose an emoji category!</h2>
        <div className="text-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {Object.entries(emojiCategory).map(([category, emojis]) => {
            const isSelectedByP1 = playerSelections[1]?.[0] === emojis[0];
            const isDisabledForP2 = player === 2 && isSelectedByP1;

            return (
              <button
                key={category}
                className={`
                  border-2 border-gray-400 rounded-lg px-6 py-4 text-lg text-amber-50 transition-colors duration-300  
                  ${isSelectedByP1 ? 'bg-blue-500' : 'bg-[rgba(255,251,235,0.3)]'}

                  ${!isSelectedByP1 && !isDisabledForP2 && player === 1 ? 'hover:bg-blue-300' : ''}
                  ${!isSelectedByP1 && !isDisabledForP2 && player === 2 ? 'hover:bg-red-300' : ''}
                  ${isDisabledForP2 ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                disabled={isDisabledForP2}
                onClick={() => {
                  if (!isDisabledForP2) {
                    click.currentTime = 0;
                    click.play();
                    emojiSelect(emojis);
                  }
                }}
              >
                {category}
                <div className="text-center text-4xl mt-2 ">{emojis[0]}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;