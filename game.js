(function(){
  if (typeof window.GameOfLife === "undefined") {
    window.GameOfLife = {};
  }

  var GameOfLife = window.GameOfLife;

  var Board = GameOfLife.Board = function (options) {
      this.numX = options.numX;
      this.numY = options.numY;
      this.generateGrid();
      this.generation = 0;
  };

  Board.prototype.generateGrid = function () {
    this.grid = [];
    for (var i = 0; i < this.numX; i++) {
      this.grid.push([]);
      for (var j = 0; j < this.numY; j++) {
        this.grid[i].push(null);
      }
    }
  };

  Board.prototype.draw = function (ctx, offset, numBoxes, size) {
    var offsetX = (this.numX - Math.floor(numBoxes[0] - numBoxes[0] % 2)) / 2;
    var offsetY = (this.numY - Math.floor(numBoxes[1] - numBoxes[1] % 2)) / 2;
    this.grid.forEach(function(row, i){
      row.forEach(function(cell, j){
        if (cell === "A") {
          ctx.fillRect((i - offsetX) * size + offset[0], (j - offsetY) * size + offset[1], size, size);
        }
      }.bind(this));
    }.bind(this));
  };

  Board.prototype.step = function () {
    this.generation++;
    var self = this;
    var changes = [];
    self.grid.forEach(function(row, i){
      row.forEach(function(cell, j){ //IMPLEMENT KILL ZONE ON EDGES
        var numNeighbors = self.tallyNeighbors([i , j]);

        if (cell === "A") {
          if (numNeighbors < 2 || numNeighbors > 3) {
            changes.push([i , j, "D"])
          }
        } else {
          if (numNeighbors === 3) {
            changes.push([i , j, "A"])
          }
        }
      });
    });

    this.makeChanges(changes);
  };

  Board.prototype.makeChanges = function (changes) {
    if (!changes.length) {return;}
    changes.forEach(function (change) {
      var i = change[0];
      var j = change[1];
      var val = change[2];
      this.grid[i][j] = val;
    }.bind(this))
  };

  Board.prototype.tallyNeighbors = function (pos) {
    var x = pos[0];
    var y = pos[1];
    var tally = 0;
    for (var i = x - 1; i < x + 2; i++) {
      for (var j = y - 1; j < y + 2; j++) {
        if ( (i === x && j === y) || !this.onBoard([i, j])) {continue;}
        if (this.grid[i][j] === "A") {
          tally++;
        }
      }
    }

    return tally;
  };

  Board.prototype.onBoard = function (pos) {
    var x = pos[0];
    var y = pos[1];
    return (x >= 0 && x < this.numX) && (y >= 0 && y < this.numY);
  };

  Board.prototype.onEdge = function (pos) {
    var x = pos[0];
    var y = pos[1];
    return (x === 0 || x === Board.numX - 1) || (y === 0 || y === Board.numY - 1)
  };

  Board.prototype.set = function (pos, val) {
    var x = pos[0];
    var y = pos[1];
    this.grid[x][y] = val;
  };
})();
