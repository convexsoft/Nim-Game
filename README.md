### The Game Model

Rule: 13 lollipops, and the player who takes the last one lose this game. The users should always goes first.


```
    first: Boolean, // True means the AI goes first, otherwise player goes first
    win: Boolean, // True means the AI wins, otherwise player wins
    gameBoard: [], // Store the game board
    Weight: [], // The updated weight data
    createdAt: {type: Date, default: Date.now},
    gamerType: Number // 1 means the player is human, (2 means the player is perfect, and 3 means the layer is random).
    algoType: Number // Default is 1,
    playerID: The unique player ID
```
