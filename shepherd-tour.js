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
    text: 'Welcome to the pattern generator!',
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

  GameOfLife.tour.addStep('conway-options-step', {
    text: 'These dropdown menus are preset patterns. Try them out!',
    attachTo: '.conway-buttons top',
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
    text: 'While in Conway mode, use the mouse cursor to click/drag and activate cells! Enjoy!',
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
