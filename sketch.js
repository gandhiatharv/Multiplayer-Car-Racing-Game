var canvas, backgroundImage;

var gameState = 0;
var playerCount, finishedPlayers;
var allPlayers;
var distance = 0;
var tries = 2;
var tries2 = 2;
var tries3 = 2;
var database, passedFinish;
var car1, car2, car3, car4, cars;
var car1img, car2img, car3img, car4img, ground, lobbysound, playsound, endsound, hitobstacle;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacle7, obstacle8, obstacle9, obstacle10;
var obstacles, obstaclesGroup;
var track, obstacle;
var w, h, f1, s, i;
var f2, f3, f4, f5, f6, f7, f8, f9, f10;
var bronze_img, silver_img, gold_img;
var form, player, game;
var rand;

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
  obstacle4 = loadImage("images/obstacle4.png");
  obstacle5 = loadImage("images/obstacle5.png");
  obstacle6 = loadImage("images/obstacle6.png");
  obstacle7 = loadImage("images/obstacle7.png");
  obstacle8 = loadImage("images/obstacle8.png");
  obstacle9 = loadImage("images/obstacle9.png");
  bronze_img = loadImage("images/bronze.png");
  silver_img = loadImage("images/silver.png");
  gold_img = loadImage("images/gold.png");
  hitobstacle = loadSound("sound/obstaclehit.mp3");
}

function setup(){
  canvas = createCanvas(displayWidth-20,displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  finishedPlayers = 0;
  obstacles = createGroup();
  xVel = 0;
  yVel = 0;
  xset = false;

for(var i = 0; i < 12; i++){
  w = random(displayWidth/4.4, displayWidth/1.29);
  //h = random(-height*4, 0);
  h = -height*3.8;
  rand = Math.round(random(1, 9));
  if (rand === 1){
  f1 = createSprite(w, h);
  f1.addImage(obstacle1);
  f1.scale = 0.13;
  obstacles.add(f1);
  }
  if (rand === 2){
    f2 = createSprite(w, h);
    f2.addImage(obstacle2);
    f2.scale = 0.13;
    obstacles.add(f2);
    }  if (rand === 3){
      f3 = createSprite(w, h);
      f3.addImage(obstacle3);
      f3.scale = 0.13;
      obstacles.add(f3);
      }  if (rand === 4){
        f4 = createSprite(w, h);
        f4.addImage(obstacle4);
        f4.scale = 0.12;
        obstacles.add(f4);
        }  if (rand === 5){
          f5 = createSprite(w, h);
          f5.addImage(obstacle5);
          f5.scale = 0.55;
          obstacles.add(f5);
          }  if (rand === 6){
            f6 = createSprite(w, h);
            f6.addImage(obstacle6);
            f6.scale = 0.25;
            obstacles.add(f6);
            }  if (rand === 7){
              f7 = createSprite(w, h);
              f7.addImage(obstacle7);
              f7.scale = 0.275;
              obstacles.add(f7);
              }  if (rand === 8){
                f8 = createSprite(w, h);
                f8.addImage(obstacle8);
                f8.scale = 0.3;
                obstacles.add(f8);
                }  if (rand === 9){
                  f9 = createSprite(w, h);
                  f9.addImage(obstacle9);
                  f9.scale = 0.6;
                  obstacles.add(f9);
                  }
}

}



function draw(){
  if(playerCount === 4 && finishedPlayers === 0){
    game.update(1);
  }

if(tries === 2 && playerCount === 4){
  lobbysound.stop();
  endsound.stop();
  playsound.play();
  tries = tries - 1;
}

if(finishedPlayers === 4){
  game.update(2);
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
  }
}
function keyPressed() {
  if (keyCode === 13 && gameState !== 1 && passedFinish === false) {
    form.enter();
    console.log("hai");
    passedFinish = true;
  }
}