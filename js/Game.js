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
    car1 = createSprite(0, 200);
    car1.addImage(car1img);
    car2 = createSprite(200, 200);
    car2.addImage(car2img);
    car3 = createSprite(400, 200);
    car3.addImage(car3img);
    car4 = createSprite(600, 200);
    car4.addImage(car4img);
    cars = [car1, car2, car3, car4];

  }

  play(){
    form.hide();
    form.showReset();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
player.getCarsAtEnd();


    if(allPlayers !== undefined){
      background(ground);
      image(track, 0, -displayHeight*4, displayWidth, displayHeight*5); 
      var index = 0;
      var x = 225;
      var y;
      //var display_position = 130;
      for(var plr in allPlayers){
        index = index + 1;
        x = x + 275;
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
      player.rank+=1;
      Player.updateCarsAtEnd(player.rank);
      swal({ title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`, text: "You reached the finish line successfully.", imageUrl: "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png", imageSize: "100x100", confirmButtonText: "Ok", });
    }
    drawSprites();
  }
  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
