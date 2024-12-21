class RatEnemy extends Enemy {
  constructor(board, decay) {
    super(board,decay);
    this.width = 70;
    this.height = 30;
    
   
    // this.element = document.createElement("img");
    this.element.setAttribute("src", "/dodo-GAME/assets/img/rat.gif");
  }

  draw(){
    super.draw();
    
  }
  move() {
    super.move();
  }
}
