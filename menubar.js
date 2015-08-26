(function(){
  if (typeof GameOfLife === "undefined") {
    var GameOfLife = window.GameOfLife = {};
  }

  var MenuBar = GameOfLife.MenuBar = function (options) {
    this.board = options.board;
    var $body = $('body');
    this.$startButton = $body.find('.start-button');
    this.$stopButton = $body.find('.stop-button');
    this.$stepButton = $body.find('.step-button');
    this.timerId = null;
    this.mode = "paused";

    this.bindClickHandlers();
  };

  MenuBar.prototype.bindClickHandlers = function () {
    this.$startButton.click(this.startGame.bind(this));
    this.$stopButton.click(this.stopGame.bind(this));
  };

  MenuBar.prototype.startGame = function () {
    if (this.mode === "running") {return;}
    this.mode = "running";
    this.timerId = setInterval(this.runGame.bind(this), 100); // CAN REFACTOR THIS INTO A VARIABLE FRAME RATE
  };

  MenuBar.prototype.runGame = function () {
    this.board.step();
    this.board.draw();
  };

  MenuBar.prototype.stopGame = function () {
    if (this.mode === "paused") {return;}
    this.mode = "paused";
    window.clearInterval(this.timerId);
  };


})();
