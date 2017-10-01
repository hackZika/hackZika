// define variables
let game;
let player;
let platforms;
let badges;
let cursors;
let jumpButton;
let text;
let message;
let won = false;
let lost = false;
let currentScore = 0;
let lives = 5;
let level;

// barrier randomizer
// function randomItems() {
//   let items = Math.floor(Math.random() * 500) - 1;
// }

// add collectable
function addItems() {
  items = game.add.physicsGroup();
  createItem(375, 400, 'coin');
  createItem(100, 100, 'coin');
  createItem(225, 200, 'star');
  createItem(575, 500, 'poison');
  createItem(125, 120, 'fish');
  createItem(425, 300, 'heart');
}

// add platforms
function addPlatforms() {
  platforms = game.add.physicsGroup();
}

// create a single animated item
function createItem(left, top, image) {
  let item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}

// create badge to go to next level

function createBadge() {
  badges = game.add.physicsGroup();
  let badge = badges.create(750, 400, 'badge');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}

// when the player collects an item on the screen

function itemHandler(player, item) {
  item.kill();
  switch (item.key) {
    case 'poison':
      lives -= 1;
      break;
    case 'mist':
      lives -= 2;
      break;
    case 'window':
      lives -= 3;
      break;
    case 'fish':
      lives -= lives;
      break;
    case 'coin':
      currentScore += 25;
      break;
    case 'honey':
      currentScore += 50;
      break;
    case 'heart':
      lives += 1;
      break;
    case 'star':
      currentScore += 100;
  }
}

// when the player collects the badge
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}

// setup game when the web page loads
window.onload = function() {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update,
    render: render
  });

  // before the game begins
  function preload() {
    game.stage.backgroundColor = '#5db1ad';

    //load images

    //load spritesheets
    game.load.spritesheet('player', 'assets/digger.png', 30, 30);
    game.load.spritesheet('coin', 'assets/coin.png', 36, 44);
    game.load.spritesheet('poison', 'assets/poison.png', 32, 32);
    game.load.spritesheet('star', 'assets/star.png', 32, 32);
    game.load.spritesheet('heart', 'assets/hearts.png', 16, 14);
  }
  //initial game set up
  function create() {
    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 200;

    addItems();
    // addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, 'SCORE: ' + currentScore, {
      font: 'bold 24px Arial',
      fill: 'white'
    });
    winningMessage = game.add.text(game.world.centerX, 275, '', {
      font: 'bold 48px Arial',
      fill: 'white'
    });
    winningMessage.anchor.setTo(0.5, 1);
  }

  //while the game is running

  function update() {
    text.text = 'SCORE: ' + currentScore + ' LIVES: ' + lives;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = -1;
    } else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    } else if (cursors.up.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.y = -200;
      player.scale.y = 1;
    } else if (cursors.down.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.y = 200;
      player.scale.y = 1;
    } else {
      player.animations.stop();
    }

    if (
      jumpButton.isDown &&
      (player.body.onFloor() || player.body.touching.down)
    ) {
      player.body.velocity.y = -400;
    }

    if (won) {
      winningMessage.text = 'Prepare for the next level!';
    }
  }

  function render() {}
};
