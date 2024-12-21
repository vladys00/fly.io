class RockPoints extends Enemy {
  constructor(board) {
    super(board);
    this.sy = 8;
    this.widht = 5;
    this.height = 45;

    this.element.setAttribute("src", "/dodo-GAME/assets/img/rock2.png");
    this.element.className = "rock";
  }
  draw() {
    super.draw();
    this.element.style.backgroundColor = "rgba(144, 238, 144, 0.3)";
    this.element.style.borderRadius = "50%";
    this.element.style.padding = "6px"
  }
  move(){
    super.move();
  }
}
