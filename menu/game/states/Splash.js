let Splash = function() {};

Splash.prototype = {
  loadScripts: function() {
    game.load.script('style', 'menu/game/lib/style.js');
    game.load.script('mixins', 'menu/game/lib/mixins.js');
    game.load.script('WebFont', 'menu/game/vendor/webfontloader.js');
    game.load.script('gamemenu', 'menu/game/states/GameMenu.js');
    game.load.script('game', 'menu/game/states/Game.js');
    game.load.script('gameover', 'menu/game/states/GameOver.js');
    game.load.script('credits', 'menu/game/states/Credits.js');
    game.load.script('options', 'menu/game/states/Options.js');
  },

  loadBgm: function() {
    // thanks Kevin Macleod at http://incompetech.com/
    game.load.audio('dangerous', 'assets/bgm/Dangerous.mp3');
    game.load.audio('exit', 'assets/bgm/Exit the Premises.mp3');
  },
  // letios freebies found from google image search
  loadImages: function() {
    game.load.image('menu-bg', 'menu/game/assets/images/menu-bg.jpg');
    game.load.image('options-bg', 'menu/game/assets/images/options-bg.jpg');
    game.load.image('gameover-bg', 'menu/game/assets/images/gameover-bg.jpg');
  },

  loadFonts: function() {
    WebFontConfig = {
      custom: {
        families: ['Press Start 2P'],
        urls: ['menu/game/assets/style/theminion.css']
      }
    };
  },

  init: function() {
    this.loadingBar = game.make.sprite(game.world.centerX - 387 / 2, 400, 'loading');
    this.logo = game.make.sprite(game.world.centerX, 200, 'brand');
    this.status = game.make.text(game.world.centerX, 380, 'Loading...', {
      fill: 'white'
    });
    utils.centerGameObjects([this.logo, this.status]);
  },

  preload: function() {
    game.add.existing(this.logo).scale.setTo(0.5);
    game.add.existing(this.loadingBar);
    game.add.existing(this.status);
    this.load.setPreloadSprite(this.loadingBar);

    this.loadScripts();
    this.loadImages();
    this.loadFonts();
    this.loadBgm();
  },

  addGameStates: function() {
    game.state.add('GameMenu', GameMenu);
    game.state.add('Game', Game);
    game.state.add('GameOver', GameOver);
    game.state.add('Credits', Credits);
    game.state.add('Options', Options);
  },

  addGameMusic: function() {
    music = game.add.audio('dangerous');
    music.loop = true;
    music.play();
  },

  create: function() {
    this.status.setText('Ready!');
    this.addGameStates();
    this.addGameMusic();

    setTimeout(function() {
      game.state.start('GameMenu');
    }, 2500);
  }
};
