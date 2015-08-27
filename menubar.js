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
    this.$conwayButton = $body.find('.conway-button');
    this.$cyclicButton = $body.find('.cyclic-button');
    this.$slider = $body.find('.slider');
    this.timerId = null;
    this.mode = "paused";

    this.bindClickHandlers();
  };

  MenuBar.prototype.bindClickHandlers = function () {
    this.$startButton.click(this.startGame.bind(this));
    this.$stopButton.click(this.stopGame.bind(this));
    this.$stepButton.click(this.stepGame.bind(this));
    this.$conwayButton.click(this.switchGame.bind(this));
    this.$cyclicButton.click(this.switchGame.bind(this));
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
    debugger;
    this.board.mode = this.mode = "paused";
    window.clearInterval(this.timerId);
  };

  MenuBar.prototype.stepGame = function () {
    if (this.mode === "running") {return;}
    this.board.step();
  };

  MenuBar.prototype.switchGame = function (event) {
    var $target = $(event.currentTarget);
    this.board.mode = this.mode = "paused";
    window.clearInterval(this.timerId);
    if ($target.text() === "Conway") {
      this.board.gameType = "Conway";
      this.board.reset();

    } else if ($target.text() === "Cyclic") {
      this.board.gameType = "Cyclic";
      this.board.reset();
    }
  };




})();
