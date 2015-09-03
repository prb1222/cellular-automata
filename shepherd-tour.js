(function(){
  if (typeof window.GameOfLife === "undefined") {
    window.GameOfLife = {};
  }

  var GameOfLife = window.GameOfLife;

  GameOfLife.tour = new Shepherd.Tour({
    defaults: {
      classes: 'shepherd-theme-arrows',
      scrollTo: true
    }
  });

  GameOfLife.tour.addStep('intro-step', {
    text: 'Welcome to the Cellular Automata simulator! Feel free to skip this, and try some of the preset boards! Also, use your mouse to draw on the canvas in Conway mode.',
    attachTo: 'body top',
    buttons: [
      {
        text: "Next",
        action: GameOfLife.tour.next
      },

      {
        text: 'Done',
        action: GameOfLife.tour.cancel
      }

    ]
  });


  GameOfLife.tour.addStep('conway-button-step', {
    text: 'There are two major modes for the game: Conway, and Cyclic.',
    attachTo: '.conway-button bottom',
    buttons: [
      {
        text: "Back",
        action: GameOfLife.tour.back
      },

      {
        text: "Next",
        action: GameOfLife.tour.next
      },

      {
        text: 'Done',
        action: GameOfLife.tour.cancel
      }

    ]
  });



  GameOfLife.tour.addStep('start-button-step', {
    text: 'These buttons control the flow of the simulation.',
    attachTo: '.start-button bottom',
    buttons: [
      {
        text: "Back",
        action: GameOfLife.tour.back
      },

      {
        text: "Next",
        action: GameOfLife.tour.next
      },

      {
        text: 'Done',
        action: GameOfLife.tour.cancel
      }

    ]
  });

  GameOfLife.tour.addStep('conway-options-step', {
    text: 'This dropdown menu generates interesting preset patterns for the Conway game. \<br\>Simply select a board, and press the start button.',
    attachTo: '#conway-options bottom',
    buttons: [
      {
        text: "Back",
        action: GameOfLife.tour.back
      },

      {
        text: "Next",
        action: GameOfLife.tour.next
      },

      {
        text: 'Done',
        action: GameOfLife.tour.cancel
      }

    ]
  });

  GameOfLife.tour.addStep('cyclic-options-step', {
    text: 'This dropdown menu generates interesting preset patterns for the Cyclic game. Simply select a board, and the game will start automatically.',
    attachTo: '#cyclic-options bottom',
    buttons: [
      {
        text: "Back",
        action: GameOfLife.tour.back
      },

      {
        text: "Next",
        action: GameOfLife.tour.next
      },

      {
        text: 'Done',
        action: GameOfLife.tour.cancel
      }

    ]
  });

  GameOfLife.tour.addStep('canvas-step', {
    text: 'While in Conway mode, use the mouse cursor to click/drag and activate cells! I hope you enjoy it!',
    attachTo: 'canvas top',
    buttons: [
      {
        text: "Back",
        action: GameOfLife.tour.back
      },

      {
        text: 'Done',
        action: GameOfLife.tour.cancel
      }

    ]
  });

})();
