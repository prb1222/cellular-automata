(function () {
  if(typeof window.GameOfLife === "undefined") {
    window.GameOfLife = {};
  }

  var GameOfLife = window.GameOfLife;

  var View = GameOfLife.View = function (board) {
    this.board = board;
    this.menu = new GameOfLife.MenuBar({board: this.board});
    this.start();
    this.$counter = $('.counter');
    this.$zoomBar = $('#zoom-bar');
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.ctx = this.canvas.getContext("2d");
    this.$mode = $('.mode');
    this.squareSize = 10;
    this.numX = View.CANVAS_DIM_X / this.squareSize;
    this.numY = View.CANVAS_DIM_Y / this.squareSize;
    this.bindEvents();
    GameOfLife.tour.start();
  };

  View.CANVAS_DIM_X = 1000;
  View.CANVAS_DIM_Y = 600;
  View.ACTIVE_COLOR = '#ff0';
  View.BG_COLOR = "#ccc";
  View.LINE_COLOR = "#999";

  View.prototype.bindEvents = function () {
    this.$zoomBar.on('input', this.changeSize.bind(this));
    $(this.canvas).click(this.handleClickEvent.bind(this));
    $('body').mousedown(this.toggleSelecting.bind(this));
    $('body').mouseup(this.stopSelecting.bind(this));
    $(this.canvas).mousemove(this.selectSquares.bind(this));
  };

  View.prototype.start = function () {
    var self = this;
    setInterval(function() {
      self.draw();
      self.$counter.text(self.board.generation);
      self.$mode.text(self.board.mode);
    }, 10);

  };

  View.prototype.draw = function () {
    this.ctx.clearRect(0, 0, View.CANVAS_DIM_X, View.CANVAS_DIM_Y);
    this.ctx.fillStyle = View.BG_COLOR;
    this.ctx.fillRect(0, 0, View.CANVAS_DIM_X, View.CANVAS_DIM_Y);

    this.ctx.fillStyle = View.ACTIVE_COLOR;
    var size = this.squareSize;
    var offset = [];
    offset[0] = ((this.numX) % 2) / 2 * size;
    offset[1] = ((this.numY) % 2) / 2 * size;

    this.board.draw(this.ctx, offset, [this.numX, this.numY] , this.squareSize);
    this.drawLines(offset);
  };

  View.prototype.drawLines = function (offset) { // A little bit of Y extra
    this.ctx.fillStyle = View.LINE_COLOR;
    var size = this.squareSize;

    for (var i = 0; i < this.numX; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(size * i + offset[0], 0);
      this.ctx.lineTo(size * i + offset[0], View.CANVAS_DIM_Y);
      this.ctx.stroke();
    }

    for (var i = 0; i < this.numY; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, size * i + offset[1]);
      this.ctx.lineTo(View.CANVAS_DIM_X, size * i + offset[1]);
      this.ctx.stroke();
    }
  };

  View.prototype.handleClickEvent = function (event) {
    var mousePos = this.getMousePos(event);
    var size = this.squareSize;
    var offsetX = (this.board.numX - Math.floor(this.numX- this.numX % 2)) / 2;
    var offsetY = (this.board.numY - Math.floor(this.numY - this.numY % 2)) / 2;
    var xBox = offsetX + Math.floor((mousePos.x - this.numX % 2 / 2 * size) / size);
    var yBox = offsetY + Math.floor((mousePos.y - this.numY % 2 / 2 * size) / size);
    this.board.set([xBox, yBox]);
  };

  View.prototype.getMousePos = function (event) {
    var rect = this.canvas.getBoundingClientRect();
    return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        };
  };

  View.prototype.changeSize = function () {
    var amount = this.$zoomBar.val();
    this.squareSize = 9 / 10 * amount + 10;
    $('.zoom').text(Math.floor(this.squareSize / 10) + "X");
    this.numX = View.CANVAS_DIM_X / this.squareSize;
    this.numY = View.CANVAS_DIM_Y / this.squareSize;
  };

  View.prototype.toggleSelecting = function (event) {
    this.selecting = this.selecting ? false : true;
  };

  View.prototype.selectSquares = function (event) {
    if (!this.selecting) {return;}
    this.handleClickEvent(event);
  };

  View.prototype.stopSelecting = function () {
    this.selecting = false;
  };

})();
