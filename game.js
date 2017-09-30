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
function randomItems() {
  let items = Math.floor(Math.random() * 500) - 1;
}

// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
  createItem(375, 400, 'coin');
  createItem(575, 500, 'coin');
  createItem(225, 500, 'coin');
  createItem(100, 250, 'coin');
  createItem(575, 150, 'coin');
  createItem(525, 300, 'coin');
  createItem(650, 250, 'coin');
  createItem(225, 200, 'coin');
  createItem(375, 100, 'poison');
  createItem(370,500,'poison');
  createItem(100, 375, 'poison');
  createItem(125, 50, 'star');
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
_itemsPlus(player, itemsPlus) => {
  itemPlus.kill();
  switch (itemsPlus) {
    case 'honey': currentScore += 10;
    [break;]
    case 'water': currentScore += 20;
    [break;]
  }
}

_itemsMinus(player, itemsMinus) => {
  itemsMinus.kill();
  switch (itemsMinus) {
    case 'poison': lives -= 1;
    [break;]
    case 'mist': lives -= 2;
    [break;]
  }
}

// when the player collects the badge
_badge() => {
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
}
