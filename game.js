(function(){
  if (typeof window.GameOfLife === "undefined") {
    window.GameOfLife = {};
  }

  var GameOfLife = window.GameOfLife;

  var Board = GameOfLife.Board = function (options) {
      this.ctx = options.ctx;
      this.menu = new GameOfLife.MenuBar({board: this});
      this.generateGrid();
      this.bindClickHandlers();
      this.canvas = document.getElementsByTagName('canvas')[0];
  };

  Board.DIM_X = 1000;
  Board.DIM_Y = 400;
  Board.BG_COLOR = '#ccc';
  Board.SQUARE_SIZE = 10;
  Board.LINE_COLOR = '#999';
  Board.ACTIVE_COLOR = "#ff0"
  Board.numX = Board.DIM_X / Board.SQUARE_SIZE;
  Board.numY = Board.DIM_Y / Board.SQUARE_SIZE;;

  Board.prototype.generateGrid = function () {
    this.grid = [];
    for (var i = 0; i < Board.numX; i++) {
      this.grid.push([]);
      for (var j = 0; j < Board.numY; j++) {
        this.grid[i].push(null);
      }
    }
  };

  Board.prototype.draw = function () {
    this.ctx.clearRect(0, 0, Board.DIM_X, Board.DIM_Y);
    this.ctx.fillStyle = Board.BG_COLOR;
    this.ctx.fillRect(0, 0, Board.DIM_X, Board.DIM_Y);

    this.ctx.fillStyle = Board.ACTIVE_COLOR;
    var size = Board.SQUARE_SIZE;

    this.grid.forEach(function(row, i){
      row.forEach(function(cell, j){
        if (cell === "A") {
          this.ctx.fillRect(i * size, j * size, size, size);
        }
      }.bind(this));
    }.bind(this));

    for (var i = 0; i < Board.numX; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(Board.SQUARE_SIZE * (i + 1), 0);
      this.ctx.lineTo(Board.SQUARE_SIZE * (i + 1), Board.DIM_Y);
      this.ctx.stroke();
    }

    for (var i = 0; i < Board.numY; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, Board.SQUARE_SIZE * (i + 1));
      this.ctx.lineTo(Board.DIM_X, Board.SQUARE_SIZE * (i + 1));
      this.ctx.stroke();
    }
  };

  Board.prototype.step = function () {
    var self = this;
    debugger;
    self.grid.forEach(function(row, i){
      row.forEach(function(cell, j){
        var numNeighbors = self.tallyNeighbors([i , j]);

        if (cell === "A") {
          if (numNeighbors < 2 || numNeighbors > 3) {
            self.grid[i][j] = "D";
          }
        } else {
          if (numNeighbors === 3) {
            self.grid[i][j] = "A";
          }
        }
      });
    });
  };

  Board.prototype.tallyNeighbors = function (pos) {
    var x = pos[0];
    var y = pos[1];
    var tally = 0;
    for (var i = x; i < x + 2; i++) {
      for (var j = y; j < y + 2; j++) {
        this.grid[i][j]
      }
    }
  };

  Board.prototype.offBoard = function (pos) {
    var x = pos[0];
    var y = pos[1];
  };

  Board.prototype.bindClickHandlers = function () {
    $('canvas').click(this.handleClickEvent.bind(this));
  };

  Board.prototype.handleClickEvent = function (event) {
    var mousePos = this.getMousePos(event);
    var size = Board.SQUARE_SIZE;
    var xBox = Math.floor(mousePos.x / size);
    var yBox = Math.floor(mousePos.y / size);
    this.grid[xBox][yBox] = "A";
    this.ctx.fillStyle = Board.ACTIVE_COLOR;
    this.ctx.fillRect(xBox * size, yBox * size, size, size)
  };

  Board.prototype.getMousePos = function (event) {
    var rect = this.canvas.getBoundingClientRect();
    return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        };
  };
})();
