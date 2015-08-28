(function(){
  if (typeof window.GameOfLife === "undefined") {
    window.GameOfLife = {};
  }

  var GameOfLife = window.GameOfLife;

  var Board = GameOfLife.Board = function (options) {
      this.numX = options.numX;
      this.numY = options.numY;
      this.gameType = "Conway";
      this.generateGrid();
      this.generation = 0;
      this.threshold = 1;
  };

  // Board.COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
  Board.COLORS = ['red', 'orange', 'yellow', 'green'];

  Board.prototype.generateGrid = function () {
    this.grid = [];
    for (var i = 0; i < this.numX; i++) {
      this.grid.push([]);
      for (var j = 0; j < this.numY; j++) {
        if (this.gameType === "Conway") {
          this.grid[i].push("D");
        } else if (this.gameType === "Cyclic") {
          this.grid[i].push(GameOfLife.Board.COLORS[Math.floor(Math.random() * 4)]);
        }
      }
    }
  };

  Board.prototype.draw = function (ctx, offset, numBoxes, size) {
    var offsetX = (this.numX - Math.floor(numBoxes[0] - numBoxes[0] % 2)) / 2;
    var offsetY = (this.numY - Math.floor(numBoxes[1] - numBoxes[1] % 2)) / 2;
    this.grid.forEach(function(row, i){
      row.forEach(function(cell, j){
        if (cell === "A" || Board.COLORS.indexOf(cell) !== -1) {
          if (this.gameType === "Cyclic") {
            ctx.fillStyle = cell;
          }
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
        self.cellChange(cell, i , j, numNeighbors, changes);
      });
    });

    this.makeChanges(changes);
  };

  Board.prototype.cellChange = function (cell, i, j, numNeighbors, changes) {
    if (this.gameType === "Conway") {
      this.conwayChange(cell, i , j, numNeighbors, changes);
    } else if (this.gameType === "Cyclic") {
      this.cyclicChange(cell, i, j, numNeighbors, changes);
    }
  };

  Board.prototype.conwayChange = function (cell, i, j, numNeighbors, changes) {
    if (cell === "A") {
      if (numNeighbors < 2 || numNeighbors > 3) {
        changes.push([i , j, "D"]);
      }
    } else {
      if (numNeighbors === 3) {
        changes.push([i , j, "A"]);
      }
    }
  };

  Board.prototype.cyclicChange = function (cell, x, y, numNeighbors, changes) {
    var currentIndex = Board.COLORS.indexOf(cell);
    var tally = 0;
    // var surrounded = true;
    // var surroundedColor = null;
    for (var i = x - 1; i < x + 2; i++) {
      for (var j = y - 1; j < y + 2; j++) {
        if ( i === x && j === y ) {continue;}
        if (!this.onBoard([i, j])) {
          var neighborPos = this.wrapPos([i, j]);
        } else {
          var neighborPos = [i, j];
        }
        var neighborColor = this.getVal(neighborPos);
        // if (surroundedColor && surroundedColor !== neighborColor) {
        //   surrounded = false;
        // } else {
        //   surroundedColor = neighborColor
        // }
        var neighborIndex = Board.COLORS.indexOf(neighborColor);
        if ((currentIndex + 1) % 4 === neighborIndex) {
          tally++
        }
      }
    }

    if (tally > this.threshold) {
      changes.push([x, y, Board.COLORS[(currentIndex + 1) % 4]]);
    }
    // if (surrounded) {
    //   changes.push([x, y, surroundedColor]);
    // } else if (tally > this.threshold) {
    //   changes.push([x, y, Board.COLORS[(currentIndex + 1) % 6]]);
    // }
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
        if (i === x && j === y) {continue;}

        if (!this.onBoard([i, j])) {
          var neighborPos = this.wrapPos([i, j]);
        } else {
          var neighborPos = [i, j];
        }

        if (this.getVal(neighborPos) === "A") {
          tally++;
        }
      }
    }

    return tally;
  };

  Board.prototype.wrapPos = function (pos) {
    var i = pos[0];
    var j = pos[1];
    result = [i, j]
    if (i < 0) {
      result[0] = this.numX + i;
    } else if (i >= this.numX ) {
      result[0] = i % this.numX;
    }

    if (j < 0) {
      result[1] = this.numY + j;
    } else if (j >= this.numY ) {
      result[1] = j % this.numY;
    }
    return result;
  };

  Board.prototype.onBoard = function (pos) {
    var x = pos[0];
    var y = pos[1];
    return (x >= 0 && x < this.numX) && (y >= 0 && y < this.numY);
  };

  Board.prototype.onEdge = function (pos) {
    var x = pos[0];
    var y = pos[1];
    return (x === 0 || x === this.numX - 1) || (y === 0 || y === this.numY - 1)
  };

  Board.prototype.set = function (pos) {
    var x = pos[0];
    var y = pos[1];
    if (this.gameType === "Conway") {
      this.grid[x][y] = "A";
    } else if (this.gameType === "Cyclic"){
      // PUT CODE FOR CCA STUFF HERE
    }
  };

  Board.prototype.getVal = function (pos) {
    var x = pos[0];
    var y = pos[1];
    return this.grid[x][y];
  };

  Board.prototype.reset = function () {
    this.generation = 0;
    this.generateGrid();
  };
})();
