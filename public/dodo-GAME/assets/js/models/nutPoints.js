class NutPoints extends Enemy {
    constructor(board){
        super(board);
        this.sy = 10;
        this.widht = 5;
        this.height = 45;
    
        this.element.setAttribute("src", "/dodo-GAME/assets/img/nut.png");
        this.element.className = "nut";

    }
    draw(){
        super.draw();
        this.element.style.backgroundColor = "rgba(255, 157, 0, 0.3)";
        this.element.style.borderRadius = "50%";
        this.element.style.padding = "6px"
    }
    move(){
        super.move();
    }

}