class Form {

  constructor() {
    this.welcomeBG = "images/background.jpg";
    this.welcome = createImg(this.welcomeBG);
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.greeting2 = createElement('h2');
    this.reset = createButton("Reset");
  }
  hide(){
    this.greeting.hide();
    this.greeting2.hide();
    this.button.hide();
    this.input.hide();
    this.welcome.hide();
  }

  display(){
    this.welcome.position(0, 0);
    this.input.position(displayWidth/2-100, displayHeight/2-80);
    this.button.position(displayWidth/2-75, displayHeight/2);

    this.reset.position(displayWidth-234, 20);

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name+"!");
      this.greeting.position(displayWidth/2-235, displayHeight/4+20);
      this.greeting2.html("Please wait for others to join.");
      this.greeting2.position(displayWidth/2-500, displayHeight/4+80);
    });

this.reset.mousePressed(()=>{
player.updateCount(0);
game.update(0);
var playerInfoRef = database.ref('players');
playerInfoRef.remove();
Player.updateCarsAtEnd(0);
location.reload();
})

  }
}
