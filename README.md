# Blink Tac Toe 🎮✨

A modern twist on classic Tic Tac Toe — now with **emoji categories**, **vanishing moves**, **animated visuals**, and **sound effects**!

🔗 **Live Demo** – [Coming Soon]  
💻 **View Code on GitHub** – [Your GitHub Repo Link Here]

---

## ⚙️ Tech Stack

- React.js (with Hooks)
- Vite for lightning-fast builds
- Tailwind CSS for styling
- GSAP for animations
- `react-confetti` for win celebration
- Plain JavaScript logic

---

## 😄 Emoji Category Selection

Before the game begins, each player selects a unique category from the following:

- 🐾 Animals  
- 🍔 Food  
- 🧳 Travel  
- 📚 Objects  
- 🌿 Nature  
- 🏅 Sports  

Each category provides a **randomized emoji set** for gameplay.  
> ⚠️ Once selected by one player, a category becomes unavailable to the other.

---

## 👻 Vanishing Rule (Core Twist)

Each player can have **only 3 emojis** on the board at a time.

- The **oldest emoji disappears** when a fourth move is made.
- This creates dynamic play and strategic pressure.
- Under the hood, it's powered by a simple **queue system**.

---

## 🔊 Sound Effects

- Clicks, wins, and resets all have **audio feedback**.
- Add your own sound by replacing the `/public/clickSound.wav` file.

---

## 🏁 Winning Visuals

- 🎯 **Winning Line Animation**: Highlights the 3-in-a-row.
- 🎉 **Confetti Celebration**: When someone wins!
- ⏳ **Delayed Winner Screen**: Appears 5 seconds after win using `gsap`.

---

## 📦 Installation & Setup

```bash
git clone https://github.com/YOUR_USERNAME/BlinkTicTacToe.git
cd BlinkTicTacToe/frontend
npm install
npm run dev