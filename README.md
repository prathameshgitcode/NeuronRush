# NeuronRush 🧠⚡

A modern, interactive brain training and math games platform built with Next.js 14, React 18, and Tailwind CSS.

## 🎮 [Play Now!](https://neuron-rush-6d66.vercel.app/)

**Live Demo:** https://neuron-rush-6d66.vercel.app/ - Try the game right now!

## 🎮 Games Included

- **Speed Math** ⚡ - Solve arithmetic equations as fast as you can before time runs out
- **Pattern Recognition** 🔢 - Identify the missing number in number sequences
- **Memory Match** 🧠 - Match emoji pairs to test your memory skills
- **Arithmetic Challenges** ➕ - Multi-step arithmetic problems with increasing difficulty

## ✨ Features

- 🎯 **Three Difficulty Levels**: Easy, Medium, and Hard
- 📊 **Progress Tracking**: Track your total score, games played, and best streaks
- 💾 **Local Storage**: Your progress is saved automatically in browser storage
- 🎨 **Modern UI**: Sleek dark theme with glassmorphic design
- 📱 **Responsive Design**: Optimized for desktop and mobile devices
- ⚡ **Fast Performance**: Built with Next.js for optimal speed
- 🔄 **Real-time Updates**: Instant feedback on correct/wrong answers
- 🌐 **Cross-browser Compatible**: Works on Chrome, Firefox, Safari, and Edge

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/prathameshgitcode/neuronrush.git
cd neuronrush

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to play!

## 🏗️ Project Structure

```
neuronrush/
├── app/
│   ├── games/
│   │   ├── speed/          # Speed Math game
│   │   ├── pattern/        # Pattern Recognition game
│   │   ├── memory/         # Memory Match game
│   │   ├── arithmetic/     # Arithmetic Challenges game
│   │   └── [type]/         # Dynamic game routes
│   ├── result/             # Results display page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── Flash.tsx           # Toast notifications
│   ├── GameHeader.tsx      # Game header with score
│   └── TimerBar.tsx        # Game timer display
├── lib/
│   ├── gameUtils.ts        # Game logic and utilities
│   └── store.tsx           # State management (Context API)
├── public/                 # Static assets
└── package.json
```

## 🛠️ Technologies Used

- **Framework**: [Next.js 14](https://nextjs.org/) - React framework for production
- **UI Library**: [React 18](https://react.dev/) - JavaScript library for building UIs
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **State Management**: React Context API with Hooks

## 📋 Game Rules

### Speed Math ⚡
- Solve arithmetic equations before time runs out
- Each correct answer gives 10 points (with streak bonus)
- 30 seconds per question
- Build streaks for bonus multiplier

### Pattern Recognition 🔢
- Watch the number sequence and predict the next number
- 35 seconds per question
- Patterns get progressively more complex
- Earn streaks for consecutive correct answers

### Memory Match 🧠
- Flip cards to find matching emoji pairs
- Complete the game with minimum moves
- Faster completion = higher score
- Great for training memory

### Arithmetic Challenges ➕
- Solve multi-step arithmetic problems
- Multiple choice answers
- Higher difficulty = more complex calculations
- Immediate feedback on answers

## 🎯 Difficulty Levels

| Level | Speed | Pattern | Memory | Arithmetic |
|-------|-------|---------|--------|------------|
| Easy | 30s/Q, 5Q | 35s/Q, 5Q | 6 pairs | Simple ops |
| Medium | 25s/Q, 8Q | 30s/Q, 8Q | 12 pairs | Medium ops |
| Hard | 20s/Q, 12Q | 25s/Q, 12Q | 18 pairs | Complex ops |

## 💾 Data Persistence

Your game statistics are automatically saved to browser localStorage:
- Total score
- Games played
- Best streak
- User level
- Best scores per game

Data persists between sessions and survives browser restarts.

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
The easiest way to deploy NeuronRush is with [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Vercel will auto-detect Next.js and configure automatically
5. Click "Deploy" - your app will be live in seconds!

### Deploy to Other Platforms
- **Netlify**: Requires changes to export as static site
- **Docker**: Can containerize the Next.js app
- **Self-hosted**: Deploy the built app to any Node.js server

## 🔧 Environment Variables

Create a `.env.local` file if needed (currently not required for core functionality):

```env
# Optional: Add any API endpoints here
NEXT_PUBLIC_API_URL=https://api.example.com
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Prathamesh** - [GitHub Profile](https://github.com/prathameshgitcode)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Fork the repository
- Create a feature branch (`git checkout -b feature/amazing-feature`)
- Commit your changes (`git commit -m 'Add some amazing feature'`)
- Push to the branch (`git push origin feature/amazing-feature`)
- Open a Pull Request

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior

## 📧 Support

For questions or support, please open an issue on GitHub.

## 🎓 Learning Resources

This project demonstrates:
- Next.js App Router
- React Hooks (useState, useEffect, useRef, useCallback)
- Context API for state management
- TypeScript in React
- Tailwind CSS for responsive design
- Local storage API
- Game logic implementation

Perfect for learning modern React and Next.js patterns!

## 📈 Future Enhancements

- [ ] User accounts and authentication
- [ ] Leaderboard system
- [ ] Difficulty progression
- [ ] Sound effects and animations
- [ ] Mobile app version
- [ ] Multiplayer challenges
- [ ] AI difficulty scaling
- [ ] More game types

---

**Happy Gaming! 🎮** Challenge yourself and improve your brain skills with NeuronRush!
