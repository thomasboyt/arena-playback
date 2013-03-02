// wrapper object for the various games.
// there's definitely a better way to do this, not sure what it is yet.

define([
  "games/checkers.js", 
  "games/connect4.js", 
  "games/tictactoe.js"
  ], function (checkers, connect4, tictactoe) {
  return {
    'Checkers': checkers,
    'Connect4': connect4,
    'Tictactoe': tictactoe
  }
});