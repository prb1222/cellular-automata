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
    this.$slider = $body.find('.slider');
    this.timerId = null;
    this.mode = "paused";

    this.bindClickHandlers();
  };

  MenuBar.prototype.bindClickHandlers = function () {
    this.$startButton.click(this.startGame.bind(this));
    this.$stopButton.click(this.stopGame.bind(this));
    this.$stepButton.click(this.stepGame.bind(this));
  };

  MenuBar.prototype.startGame = function () {
    if (this.mode === "running") {return;}
    this.board.mode = this.mode = "running";
    this.timerId = setInterval(this.runGame.bind(this), 100); // CAN REFACTOR THIS INTO A VARIABLE FRAME RATE
  };

  MenuBar.prototype.runGame = function () {
    this.board.step();
  };

  MenuBar.prototype.stopGame = function () {
    if (this.mode === "paused") {return;}
    this.board.mode = this.mode = "paused";
    window.clearInterval(this.timerId);
  };

  MenuBar.prototype.stepGame = function () {
    if (this.mode === "running") {return;}
    this.board.step();
  };




})();
