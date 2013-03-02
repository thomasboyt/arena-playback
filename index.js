require(["games/games.js"], function(games) {
  $(function() {
    // for now...
    var game = new games.Connect4({
      boardElement: $("#board")
    });

    game.gridState.bindPropertyTo("currentMoveIndex", "#current-move");

    $("#load-game").click(function(e) {
      game.loadMoves($("textarea").contents().text());
      $("#game-view").show();
    });

    $("#forward-step").click(function(e) {game.changeMoveByOffset(1)});
    $("#back-step").click(function(e) {game.changeMoveByOffset(-1)});
  });
});