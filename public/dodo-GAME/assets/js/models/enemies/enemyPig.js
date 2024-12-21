class PigEnemy extends Enemy {
  constructor(board,decay) {
    super(board,decay);
    
    
   
    this.width = 75;
    this.height = 40;
    this.element.setAttribute("src", "/dodo-GAME/assets/img/pig.gif");
  }
  draw() {
    super.draw();
    // this.element.style.backgroundColor = "rgb(255, 192, 203)";
  }
  move() {
    super.move();
  }
}
