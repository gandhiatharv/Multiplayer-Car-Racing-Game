class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form();

      form.display();
    }
    car1 = createSprite(displayWidth/4, 200);
    car1.addImage(car1img);
    car2 = createSprite(displayWidth/4, 200);
    car2.addImage(car2img);
    car3 = createSprite(displayWidth/4, 200);
    car3.addImage(car3img);
    car4 = createSprite(displayWidth/4, 200);
    car4.addImage(car4img);
    cars = [car1, car2, car3, car4];

  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
player.getCarsAtEnd();
player.getFinishedPlayers();
  /*
  if(frameCount%10 === 0 && gameState === 1){
    //obstacle = createSprite(Math.round(random(displayWidth/4.4, displayWidth/1.29)), 0, 200, 200);
    obstacle = createSprite(Math.round(random(displayWidth/4.4, displayWidth/1.29)), camera.position.y-displayHeight/2, 200, 200);
    obstacle.lifetime = 200;
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
*/

    if(allPlayers !== undefined){
      background(ground);
      image(track, 0, -displayHeight*4, displayWidth, displayHeight*5); 
      var index = 0;
      var x = displayWidth/10;
      var y;
      //var display_position = 130;
      for(var plr in allPlayers){
        index = index + 1;
        //x = x + displayWidth/6.4;
        x = x + displayWidth/6.4 + allPlayers[plr].xPos;
        y = displayHeight-allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        textAlign(CENTER);
        textSize(20);
        text(allPlayers[plr].name, cars[index-1].x, cars[index-1].y+75);
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
          cars[index-1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
          if(cars[index-1].isTouching(obstacles)){
            hitobstacle.play();
            yVel-= 100; 
          }
        }
      }
      }
      console.log(displayHeight);
        console.log(player.distance);
        if(player.distance>=5250 && tries3 === 2){
          tries3 = tries3 - 1;
          lobbysound.stop();
    playsound.stop();
    endsound.play();
    player.rank+=1;
      Player.updateCarsAtEnd(player.rank);
      console.log(player.rank);
      if(player.rank === 1){
      swal({ title: `1st Place!`, text: "Sensational job! You were ridiculously fast!", imageUrl: "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png", imageSize: "150x150", confirmButtonText: "Ok", });
    } else if (player.rank === 2){
      swal({ title: `2nd Place!`, text: "Awesome! Second place is just the first place loser.", imageUrl: "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png", imageSize: "150x150", confirmButtonText: "Ok", });
    } else if (player.rank === 3){
      swal({ title: `3rd Place`, text: "Great effort! You're not too far out from 1st!", imageUrl: "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png", imageSize: "150x150", confirmButtonText: "Ok", });
    } else{
      swal({ title: `Last Place`, text: "It's okay! Once you put more time, energy, and thought on the track, you will be a moonshiner.", imageUrl: "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png", imageSize: "150x150", confirmButtonText: "Ok", });
    }
    } else if(player.distance < 5250){
              if(keyIsDown(38) && player.index !== null){
                  yVel += 0.9;
              }else if(keyIsDown(40) && player.index !== null){
                yVel -= 0.9;
            }else if(keyIsDown(37)&&player.index!== null){
                xVel -= 0.5;
              }else if(keyIsDown(39)&&player.index!== null){
                xVel += 0.5;
              } else if(keyIsDown(38) && yVel > 0 && player.index !== null){
                  yVel -= 0.1;
                  xVel *= 0.9;
              }else{
                  yVel *= 0.985;
                  xVel *= 0.985;
              }
            }else if(passedFinish === false){
              yVel *= 0.7;
              xVel *= 0.7;
              Player.updateFinishedPlayers();
              player.place = finishedPlayers;
              player.update();
              passedFinish = true;
          }else{
              yVel *= 0.8;
              xVel *= 0.8;
          }

          player.distance += yVel;
          yVel *= 0.98;
          player.xPos += xVel;
          xVel *= 0.985;
          player.update();
          //display sprites
          drawSprites();
    }
    //if(keyIsDown(UP_ARROW) && player.index !== null){
//
   //   player.distance +=50
   //   player.update();
  //  }

   /* if(player.distance < 5250){
      if(keyIsDown(38) && player.index !== null){
        yvel+= 0.9;
        if(keyIsDown(37)){
          xvel-= 0.2;
        }
        if(keyIsDown(39)){
          xvel+= 0.2;
        }
      }
      else if(keyIsDown(38) && yvel > 0 && player.index !== null){
        yvel-=0.1;
        xvel*= 0.9;
      } else{
        yvel*= 0.985;
        xvel*= 0.985;
      }
  } else if(player.distance > 5250){
    gameState = 2;
    lobbysound.stop();
    playsound.stop();
    endsound.play();
    player.rank+=1;
    Player.updateCarsAtEnd(player.rank);
    console.log(player.rank);
    if(player.rank === 1){
    swal({ title: `1st Place!`, text: "Sensational job! You were ridiculously fast!", imageUrl: "https://raw.githubusercontent.com/gandhiatharv/Multiplayer-Car-Racing-Game/main/images/cup.png", imageSize: "150x150", confirmButtonText: "Ok", });
  } else if (player.rank === 2){
    swal({ title: `2nd Place!`, text: "Awesome! Second place is just the first place loser.", imageUrl: "https://raw.githubusercontent.com/gandhiatharv/Multiplayer-Car-Racing-Game/main/images/cup.png", imageSize: "150x150", confirmButtonText: "Ok", });
  } else if (player.rank === 3){
    swal({ title: `3rd Place`, text: "Great effort! You're not too far out from 1st!", imageUrl: "https://raw.githubusercontent.com/gandhiatharv/Multiplayer-Car-Racing-Game/main/images/cup.png", imageSize: "150x150", confirmButtonText: "Ok", });
  } else{
    swal({ title: `Last Place`, text: "It's okay! Once you put more time, energy, and thought on the track, you will be a moonshiner.", imageUrl: "https://raw.githubusercontent.com/gandhiatharv/Multiplayer-Car-Racing-Game/main/images/cup.png", imageSize: "150x150", confirmButtonText: "Ok", });
  }
  }

player.distance+= yvel;
yvel*= 0.98;
player.xPos = xvel;
xvel*= 0.985;
player.update();

  }
  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }*/
  
}