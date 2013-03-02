define(["games/game.js", "lib/dom-binding.js"], function(Game, DomBindable) {

  var Connect4 = function(options) {
    Game.call(this);

    this.moves = [];
    this.boardElement = options.boardElement;

    // create grid state
    this.gridState = new DomBindable();
    for (var i=0; i<6; i++) {
      for (var j=0; j<7; j++) {
        var name = i + "x" + j;
        this.gridState.set(name, 'empty');
      }
    }

    this.gridState.set('currentMoveIndex', 0);

    this.render();
  }

  Connect4.prototype = Object.create(Game.prototype);

  Connect4.prototype.render = function() {
    // create grid of dom elements
    // y'know, this is actually a near-legitimate use for tables. ah well.
    for (var i=0; i<6; i++) {
      var row = $("<div class='row'>");
      this.boardElement.append(row);
      for (var j=0; j<7; j++) {
        var name = i + 'x' + j;
        row.append("<div class='cell' id='cell" + name + "'>");
        this.gridState.bind(name, "#cell" + name, {type: 'class'})
      }
    }
  }

  Connect4.prototype.playMove = function(moveIndex) {
    var column = this.moves[moveIndex];

    var player;
    if (moveIndex % 2 == 0) player = 1;
    else player = 2;

    // place in the lowest empty cell
    for (var i=5; i>=0; i--) {
      if (this.gridState.get(i + 'x' + column) == 'empty') {
        this.gridState.set(i + 'x' + column, 'player' + player);
        break;
      }
    }
  }

  Connect4.prototype.rewindToMove = function(idx) {
    var rewindingIdx = idx+1;

    var column = this.moves[rewindingIdx];

    // take the top piece off the column

    for (var i=0; i<6; i++) {
      var cellState = this.gridState.get(i + 'x' + column) ;
      if (cellState == 'player1' || cellState == 'player2') {
        this.gridState.set(i + 'x' + column, 'empty');
        break;
      }
    }
  }

  Connect4.prototype.loadMoves = function(movesString) {
    // there is an elegant regular expression way to do this. see if i care
    movesString = movesString.replace("[", "");
    movesString = movesString.replace("]", "");
    movesString = movesString.replace(/\s/g, '');
    this.moves = movesString.split(",");

    this.playMove(0);
  }

  Connect4.prototype.changeMoveByOffset = function(offset) {
    var moveIndex = this.gridState.get("currentMoveIndex") + offset;
    if (this.moves[moveIndex]) {
      if (moveIndex > this.gridState.get('currentMoveIndex')) {
        this.playMove(moveIndex);
      }
      else if (moveIndex < this.gridState.get('currentMoveIndex')) {
        this.rewindToMove(moveIndex);
      }
      this.gridState.set('currentMoveIndex', moveIndex);
    }
  }

  return Connect4;
});