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

  GameOfLife.tour.addStep('example-step', {
    text: 'This step is attached to the bottom body element.',
    attachTo: 'body bottom',
    buttons: [
      {
        text: 'Next',
        action: GameOfLife.tour.cancel
      }
    ]
  });
})();
