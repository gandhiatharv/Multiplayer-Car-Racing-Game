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


    if(allPlayers !== undefined){
      background(ground);
      image(track, 0, -displayHeight*4, displayWidth, displayHeight*5); 
      var index = 0;
      var x = displayWidth/10;
      var y;
      //var display_position = 130;
      for(var plr in allPlayers){
        index = index + 1;
        x = x + displayWidth/6.4;
        y = displayHeight-allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
          cars[index-1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }

      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){

      player.distance +=50
      player.update();
    }
    if(player.distance > 5250){
      gameState = 2;
      lobbysound.stop();
      playsound.stop();
      endsound.play();
      player.rank+=1;
      Player.updateCarsAtEnd(player.rank);
      console.log(player.rank);
      if(player.rank === 1){
      swal({ title: `1st Place!`, text: "Sensational job! You were ridiculously fast!", imageUrl: "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png", imageSize: "100x100", confirmButtonText: "Ok", });
    } else if (player.rank === 2){
      swal({ title: `2nd Place!`, text: "Awesome! Second place is just the first place loser.", imageUrl: "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png", imageSize: "100x100", confirmButtonText: "Ok", });
    } else if (player.rank === 3){
      swal({ title: `3rd Place`, text: "Great effort! You're not too far out from 1st!", imageUrl: "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png", imageSize: "100x100", confirmButtonText: "Ok", });
    } else{
      swal({ title: `Last Place`, text: "It's okay! Once you put more time, energy, and thought on the track, you will be a moonshiner.", imageUrl: "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png", imageSize: "100x100", confirmButtonText: "Ok", });
    }
  }
    drawSprites();
  }
  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}