let Game = function(game) {};

Game.prototype = {
  preload: function() {
    this.optionCount = 1;
  },

  addMenuOption: function(text, callback) {
    let optionStyle = {
      font: '30pt "Press Start 2P"',
      fill: 'black',
      align: 'right'
    };
    let txt = game.add.text(game.world.centerX, this.optionCount * 445 + 200, text, optionStyle);
    txt.anchor.setTo(0.7);
    txt.stroke = '#332A2B';
    txt.strokeThickness = 4;
    let onOver = function(target) {
      target.fill = '#332A2B';
      target.stroke = 'rgba(200,200,200,0.5)';
      txt.useHandCursor = true;
    };
    let onOut = function(target) {
      target.fill = 'black';
      target.stroke = 'rgba(0,0,0,0)';
      txt.useHandCursor = false;
    };
    //txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount++;
  },

  create: function() {
    this.stage.disableVisibilityChange = false;
    game.add.sprite(0, 0, 'stars');
    this.addMenuOption('next', function(e) {
      window.location = '/game.html';
    });
  }
};
