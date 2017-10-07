// Global letiables
let game = new Phaser.Game(900, 650, Phaser.AUTO, 'game'),
  Main = function() {},
  gameOptions = {
    playSound: true,
    playMusic: true
  },
  musicPlayer;

Main.prototype = {
  preload: function() {
    game.load.image('stars', 'menu/game/assets/images/stars.jpg');
    game.load.image('loading', 'menu/game/assets/images/loading.png');
    game.load.image('brand', 'menu/game/assets/images/logo.png');
    game.load.script('polyfill', 'menu/game/lib/polyfill.js');
    game.load.script('utils', 'menu/game/lib/utils.js');
    game.load.script('splash', 'menu/game/states/Splash.js');
  },

  create: function() {
    game.state.add('Splash', Splash);
    game.state.start('Splash');
  }
};

game.state.add('Main', Main);
game.state.start('Main');
