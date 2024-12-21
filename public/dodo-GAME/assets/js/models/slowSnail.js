class SlowSnail extends Enemy {
    constructor(board){
        super(board);
        this.width = 50;
        this.height = 40;
        this.element.setAttribute("src", "/dodo-GAME/assets/img/snail.gif");
        this.element.className = "slowSnail";
    }
    move(){
        super.move();
    }
    draw(){
        super.draw();
        this.element.style.backgroundColor = "rgba(80, 245, 39, 0.3)";
        this.element.style.borderRadius = "50%";
        this.element.style.padding = "7px"
    }
}