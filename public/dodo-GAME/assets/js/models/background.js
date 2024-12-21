class Background {
    constructor(board, speed = 1){
        this.board = board;
        this.speed = speed;
        this.width = this.board.clienWidth;
        this.height = this.board.clientHeight;
        
        this.x = 0;
        this.y = 0;
        

        this.element = document.createElement("img");
        this.element.setAttribute("src", "/dodo-GAME/assets/img/sandPix.png")
        this.element.className = "background";
        this.element.style.position = "absolute";
        this.element.style.objectFit = "cover";

        this.element2 = document.createElement("img");
        this.element2.setAttribute("src", "/dodo-GAME/assets/img/sandPix2.png")
        this.element2.className = "background2";
        this.element2.style.position = "absolute";
        this.element2.style.objectFit = "cover";


    }

    draw(){
        this.element.style.width = this.width +"px";
        this.element.style.height = this.height + "px";
        this.element.style.left = this.x + "px";
        this.element.style.bottom = this.y + "px";

        this.element2.style.width = this.width +"px";
        this.element2.style.height = this.height + "px";
        this.element2.style.left = this.x + "px";
        this.element2.style.bottom = (this.y + this.height) + "px";

    
        this.board.appendChild(this.element);
        this.board.appendChild(this.element2);

    }

    move(player){
        if (player.hasStarted){
            this.y -= 5;
        }
        if (this.y <= -this.height) {
            this.y = 0;
          }

    }


}