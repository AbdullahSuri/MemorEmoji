# MemorEmoji

## Overview

MemorEmoji is a card memory game where the player must match pairs of cards within a set number of turns. This project is implemented using client-side JavaScript and styled using CSS. The game board, rules, and interaction logic are dynamically created and managed via JavaScript.

## Directory Structure

```
.
├── src
├── public
│   ├── css
│   │   └── site.css    # Styling for the game
│   ├── js
│   │   └── game.js     # Main JavaScript file for game logic
│   └── game.html       # Main HTML file for the game
├── app.mjs             # Express server setup for serving static files
├── eslint.config.mjs   # ESLint configuration file
├── package.json        # Project dependencies and scripts
├── package-lock.json   # Dependency lock file
├── .gitignore          # Ignored files (e.g., node_modules)
└── README.md           # Documentation for the project
```

## Features

- **Dynamic Game Board**: The game board is generated dynamically based on user input.
- **Customizable Game Settings**:
  - Total number of cards (must be even, between 4 and 36).
  - Maximum number of turns.
  - Option to specify custom card values.
- **Interactive Gameplay**:
  - Flip cards to reveal their values.
  - Match pairs of cards to win.
  - Turn counter displayed during gameplay.
- **Game End Conditions**:
  - Victory: All card pairs are matched.
  - Defeat: Maximum number of turns is exceeded.
- **Quit and Reset Options**: Quit the current game or play again after finishing.
- **Persistent Scoring**: Previous game scores are stored and displayed using local storage.

## Dependencies

- Node.js
- Express.js

## Setup

### Prerequisites

Ensure you have Node.js installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

1. Start the server:
   ```bash
   node app.mjs
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000/game.html
   ```

## Gameplay Instructions

1. Enter the total number of cards (even number between 4 and 36).
2. Enter the maximum number of turns allowed.
3. Optionally, enter custom card values as a comma-separated string (e.g., `😀,😀,😃,😃`).
4. Click the **Game Start** button to begin.
5. Flip two cards by clicking on them:
   - If the cards match, they remain revealed.
   - If they do not match, they flip back.
6. Continue until all pairs are matched or the maximum number of turns is reached.
7. The game ends with a victory or defeat message.
8. View your previous score or play again.

## File Descriptions

### app.mjs

A minimal Express server setup to serve static files from the `public` directory. The server listens on port 3000.

### game.js

- Implements all game logic and user interaction.
- Validates input for total cards, maximum turns, and custom card values.
- Dynamically generates the game board and handles card flips and matching logic.
- Manages game states (win, lose, play again).
- Stores and retrieves previous scores using local storage.

### game.html

- Contains the main structure of the game interface.
- Includes a form for game setup and placeholders for the game board and results.

### site.css

- Styles the game interface.
- Handles layout and visual feedback (e.g., face-down cards, game board grid).

## Example Usage

### Starting the Game

1. Enter the following values:
   - Total cards: `12`
   - Max turns: `10`
   - Card values: `😀,😀,😃,😃,😄,😄`
2. Click **Game Start**.
3. The game board appears, and you can begin flipping cards.

### Ending the Game

- Victory: All pairs are matched before reaching the maximum turns.
- Defeat: Turns exceed the maximum allowed without matching all pairs.

## Other Features

- **Play Again**: Restart the game after finishing.
- **Persistent Scores**: View the previous score from local storage.

## Limitations

- The game supports up to 36 cards.
- Custom card values must be entered as a valid comma-separated list with exactly two of each symbol.
