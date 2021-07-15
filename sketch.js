var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var car1, car2, car3, car4, cars;
var car1img, car2img, car3img, car4img, track, ground, lobbysound, playsound, endsound;

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
  if(gameState === 1){
    clear();
    game.play();
    lobbysound.stop();
    endsound.stop();
    playsound.play();
    if(frameCount%7020 === 0){
      playsound.play();
      }
  }

  if(gameState === 2){
    game.end();
    lobbysound.stop();
    playsound.stop();
    endsound.play();
  }

  if(gameState === 0){
playsound.stop();
endsound.stop();
lobbysound.play();
if(frameCount%6870 === 0){
  lobbysound.play();
  }
}
}
