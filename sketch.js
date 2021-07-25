var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var tries = 2;
var tries2 = 2;
var database;
var car1, car2, car3, car4, cars;
var car1img, car2img, car3img, car4img, ground, lobbysound, playsound, endsound;
var obstacle1, obstacle2, obstacle3;
var track

var form, player, game;

function preload(){
  car1img = loadImage("images/car1.png");
  car2img = loadImage("images/car2.png");
  car3img = loadImage("images/car3.png");
  car4img = loadImage("images/car4.png");
  ground = loadImage("images/ground.png");
  track = loadImage("images/track.jpg");
  lobbysound = loadSound("sound/lobbysound.mp3");
  playsound = loadSound("sound/gamesound.mp3");
  endsound = loadSound("sound/endsound.mp3");
  obstacle1 = loadImage("images/obstacle1.png");
  obstacle2 = loadImage("images/obstacle2.png");
  obstacle3 = loadImage("images/obstacle3.png");
}

function setup(){
  canvas = createCanvas(displayWidth-20,displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}



function draw(){
  if(playerCount === 4){
    game.update(1);
  }

if(tries === 2 && playerCount === 4){
  lobbysound.stop();
  endsound.stop();
  playsound.play();
  tries = tries - 1;
}

if(tries2 === 2 && playerCount < 4){
  endsound.stop();
  playsound.stop();
  lobbysound.play();
  tries2 = tries2 - 1;
}

  if(gameState === 1){
    clear();
    game.play();
    spawnObstacles();
  }

  if(gameState === 2){
    game.end();
  }
}

function spawnObstacles(){
    if(frameCount%30 === 0 && gameState === 1){
      obstacle = createSprite(Math.round(random(displayWidth/4.4, displayWidth/1.29)), 0, 200, 200);
      obstacle.lifetime = 300;
      obstacle.velocityY = 7;
      obstacle.scale = 0.1;
      var rand = Math.round(random(1, 3));
      if(rand === 1){
        obstacle.addImage(obstacle1);
      } else if(rand === 2){
        obstacle.addImage(obstacle2);
      } else{
        obstacle.addImage(obstacle3);
      }
    }
}