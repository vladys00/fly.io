class Enemy {
  constructor(board, decay=0) {
    this.board = board;
    this.width = 55;
    this.height = 100;

    
    
    this.maxWidth = this.board.clientWidth - this.width * 2;
    this.x = Math.floor(
      Math.random() * (this.maxWidth - this.width + 1) + this.width
    );
    
    this.y = this.board.clientHeight;
    this.decay = decay;
    this.sy = 10 - this.decay;
    this.sx = 5;
    
    this.element = document.createElement("img");
    this.element.setAttribute("src", "/dodo-GAME/assets/img/pirate.gif");
    this.element.className = "enemy";
    this.element.style.position = "absolute";

   
  }
  draw() {
    
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    

    this.element.style.bottom = this.y + "px";
    this.element.style.left = this.x + "px";

    this.board.appendChild(this.element);
  }
  move() {
    this.y -= this.sy;
  }
}
