class PowerCrab extends Enemy {
  constructor(board) {
    super(board);
    this.width = 55;
    this.height = 60;
    this.element.setAttribute("src", "/dodo-GAME/assets/img/crab.gif");
    this.element.className = "powerCrab";
  }
  move() {
    super.move();
  }
  draw() {
    super.draw();
    this.element.style.backgroundColor = "rgba(0, 183, 255, 0.33)";
        this.element.style.borderRadius = "50%";
        this.element.style.padding = "7px"
  }
}
