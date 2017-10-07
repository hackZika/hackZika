// define variables
let game;
let player;
let platforms;
let badges;
let cursors;
let jumpButton;
let text;
let message;
let lost = false;
let won = false;
let currentScore = 0;
let lives = 5;
let level;
let fish = 'assets/loveFish.png';
let backgroundImage;
let items;
let platformString = ['log1', 'log2', 'log3', 'log4', 'platform1'];
let itemString = ['coin', 'poison', 'star', 'heart', 'waterBlob'];
let x = 0;
let xPlatform;
let yPlatform;
let y;
let backgroundWater;
let water;

// add collectable
function addItems() {
  items = game.add.physicsGroup();
}

function addFish() {
  fish = game.add.physicsGroup();
}

// add platforms
function addPlatforms() {
  platforms = game.add.physicsGroup();
  platforms.create(0, 320, 'platform2');
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
      break;
    case 'bush':
      currentScore += 5;
      break;
    case 'waterBlob':
      currentScore += 10;
      break;
  }
}

// when the player collects the badge
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}

// setup game when the web page loads
window.onload = function() {
  game = new Phaser.Game(900, 550, Phaser.AUTO, 'zikaGame', {
    preload: preload,
    create: create,
    update: update,
    render: render
  });

  // before the game begins
  function preload() {
    //Load images
    game.load.image('night', 'assets/middleNight.png');
    game.load.image('platform1', 'assets/shortLogLong.png');
    game.load.image('platform2', 'assets/platform2.png');
    game.load.image('log1', 'assets/shortLog.png');
    game.load.image('log2', 'assets/mediumLog.png');
    game.load.image('log3', 'assets/longLog.png');
    game.load.image('log4', 'assets/mediumLogLong.png');

    //load spritesheets
    game.load.spritesheet('bush', 'assets/smallBush.png', 75, 40);
    game.load.spritesheet('player', 'assets/mosquito.png', 40, 40);
    game.load.spritesheet('coin', 'assets/coin.png', 36, 44);
    game.load.spritesheet('poison', 'assets/poison.png', 32, 32);
    game.load.spritesheet('star', 'assets/star.png', 32, 32);
    game.load.spritesheet('heart', 'assets/hearts.png', 16, 14);
    game.load.spritesheet('fish', 'assets/loveFish.png', 24, 37.5);
    game.load.spritesheet('water', 'assets/watertiles.png', 900, 76);
    game.load.spritesheet('waterBlob', 'assets/waterBlog.png', 17.5, 14);
    game.load.spritesheet('frog', 'assets/frog.png', 40, 32);
  }

  //initial game set up
  function create() {
    backgroundImage = game.add.tileSprite(
      game.world.centerX,
      game.world.centerY,
      900,
      550,
      'night'
    );

    backgroundWater = game.add.tileSprite(0, 500, 900, 550, 'water');

    //game.world.setBounds(0, 0, 2000, 550);
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    backgroundImage.anchor.set(0.5);
    player = game.add.sprite(50, 300, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 650;
    player.animations.play('walk', 10, true);
    player.scale.x = -1;
    fish = game.add.sprite(300, 200, 'fish', 2);
    game.physics.enable(fish, Phaser.Physics.ARCADE);
    fish.body.collideWorldBounds = true;
    fish.body.bounce.setTo(1, 1);
    fish.body.velocity.y = -200;
    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, 'SCORE: ' + currentScore, {
      font: 'bold 20px "Press Start 2P"',
      fill: 'white'
    });
    message = game.add.text(game.world.centerX, 275, '', {
      font: 'bold 48px "Press Start 2P"',
      fill: 'white'
    });
    message.anchor.setTo(0.5, 1);
  }

  //while the game is running
  function update() {
    text.text = 'SCORE: ' + currentScore + ' LIVES: ' + lives;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;

    game.time.events.loop(Phaser.Time.SECOND * 3, 'fish', this);

    // Player Mechanics
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -350;
      player.scale.x = 1;
    }

    if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 350;
      player.scale.x = -1;
    }

    if (cursors.up.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.y = -350;
      player.scale.y = 1;
    }

    if (cursors.down.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.y = 300;
      player.scale.y = 1;
    }

    if (cursors.down.isDown) {
      player.animations.stop();
    }

    if (
      jumpButton.isDown &&
      (player.body.onFloor() || player.body.touching.down)
    ) {
      player.body.velocity.y = -400;
    }

    if (won) {
      message.text = 'Prepare for the next level!';
    }
    if (lives <= 0) {
      lost = true;
      message.text = 'You LOST!';
    }

    if (player.y > 545) {
      lives = 0;
      lost = true;
      message.text = 'You LOST!';
    }

    //Repeat the background per tiles
    backgroundImage.tilePosition.x -= 1;
    backgroundWater.tilePosition.x -= 2;
    items.x -= 1;
    platforms.x -= 1;

    setTimeout(randomItems(), 50);
    setTimeout(randomPlatforms(), 5000);
  }

  function randomPlatforms() {
    let randomPlatformNumber = Math.floor(Math.random() * 6) - 1;
    if (randomPlatformNumber == -1) randomPlatformNumber = 0;
    let y = Math.floor(Math.random() * 450 - 1);
    x += 350;
    platforms.create(x, y, platformString[randomPlatformNumber]);
    platforms.setAll('body.immovable', true);
  }

  //Collectables Randomizer
  function randomItems() {
    let randomnumber = Math.floor(Math.random() * 6) - 1;
    if (randomnumber == -1) randomnumber = 0;
    if (randomnumber == 6) randomnumber = 0;
    let y = Math.floor(Math.random() * 450 - 1);
    x += 125;
    createItem(x, y, itemString[randomnumber]);
  }

  function render() {}
};
