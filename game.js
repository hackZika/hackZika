// define variables
let game;
let player;
let platforms;
let badges;
let cursors;
let jumpButton;
let text;
let winningMessage;
let won = false;
let startingScore = 0;
let currentScore;
let lives = 5;
let level;

// barrier randomizer
// function randomItems() {
//   let items = Math.floor(Math.random() * 500) - 1;
// }

// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
  createItem(375, 400, 'coin');
  createItem(575, 500, 'coin');
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

// when the player collects an item on the screen
function _itemsPlus(player, itemsPlus) {
  itemsPlus.kill();
  switch (itemsPlus) {
    case 'honey': currentScore += 10;
    break;
    case 'water': currentScore += 20;
    break;
  }
}

function _itemsMinus(player, itemsMinus) {
  itemsMinus.kill();
  switch (itemsMinus) {
    case 'poison': lives -= 1;
    break;
    case 'mist': lives -= 2;
    break;
  }
}

// when the player collects the badge
function _badge() {
  badge.kill();
  won = true;
}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
}

// before the game begins
function preload() {
  game.stage.backgroundColor = '#5db1ad';
  game.load.spritesheet('coin', 'assets/coin.png', 36, 44);
}

//load images

//load spritesheets

//initial game set up
function create() {
  player = game.add.sprite(50, 600, 'player');
  player.animations.add('walk');
  player.anchor.setTo(0.5, 1);
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;
  player.body.gravity.y = 800;

  addItems();

  cursors = game.input.keyboard.createCursorsKeys();
  jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white"});
  winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white"});
  winningMessage.anchor.setTo(0.5, 1);
}

//while the game is running

function update() {
  // text.text = "SCORE: " + currentScore;
  // game.physics.arcade.collide(player, platforms);
  // game.physics.arcade.overlap(player, items, _itemsPlus);
  // game.physics.arcade.overlap(player, items, _itemsMinus);
  // game.physics.arcade.overlap(player, badges, _badge);
  player.body.velocity.x = 0;
}

function render() {

}

//left cursor
// if (cursors.left.isDown)
