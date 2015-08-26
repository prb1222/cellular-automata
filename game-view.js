(function () {
  if(typeof window.GameOfLife === "undefined") {
    window.GameOfLife = {};
  }

  var GameOfLife = window.GameOfLife;

  var View = GameOfLife.View = function (board, ctx) {
    this.board = board;
    this.ctx = ctx;
    this.start();
  };

  View.prototype.start = function () {
    var self = this;
    setInterval(function() {
      self.board.draw();
    }, 100);
  };

})();
