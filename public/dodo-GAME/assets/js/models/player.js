class Player {
  constructor(board) {
    this.board = board;
    this.x = this.board.clientWidth / 2;
    this.yFloor = MAIN_FLOOR;
    this.y = this.yFloor;
    this.lives = 3;

    this.sx = 8;
    this.sy = 8;
    this.width = 80;
    this.height = 55;
    this.eventListeners();

    //Here we write the code like if we were in adding elements in HTML or styles with CSS
    this.element = document.createElement("img");
    this.element.setAttribute("src", "/dodo-GAME/assets/img/dodo-pixel-cropped.gif");
    this.element.className = "player";
    this.element.style.position = "absolute";
    this.hasStarted = false;
    this.movements = {
      up: false,
      down: false,
      right: false,
      left: false,
    };
  }
  draw() {
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.left = this.x + "px";
    this.element.style.bottom = this.y + "px";

    this.board.appendChild(this.element);
  }

  eventListeners() {
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          if (!this.hasStarted) {
            this.hasStarted = true;
          }
          this.movements.up = true;
          break;
        case "ArrowDown":
          this.movements.down = true;
          break;
        case "ArrowLeft":
          this.movements.left = true;
          break;
        case "ArrowRight":
          this.movements.right = true;
          break;
      }
    });

    window.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.movements.up = false;
          break;
        case "ArrowDown":
          this.movements.down = false;
          break;
        case "ArrowLeft":
          this.movements.left = false;
          break;
        case "ArrowRight":
          this.movements.right = false;
          break;
      }
    });
  }

  move() {
    if (this.movements.up) {
      this.y += this.sy;
    } else if (this.movements.down) {
      this.y -= this.sy;
    }

    if (this.movements.left) {
      this.x -= this.sx;
    } else if (this.movements.right) {
      this.x += this.sx;
    }

    //Defining boundaries

    if (this.x < 0) {
      this.x = 0;
    } else if (this.x > this.board.clientWidth - this.width) {
      this.x = this.board.clientWidth - this.width;
    }

    if (this.y < MAIN_FLOOR) {
      this.y = MAIN_FLOOR;
    } else if (this.y > this.board.clientWidth - this.height * 2) {
      this.y = this.board.clientWidth - this.height * 2;
    }
  }

  collideWith(entity) {
    return (
      this.x < entity.x + entity.width &&
      this.x + this.width > entity.x &&
      this.y < entity.y + entity.height &&
      this.height + this.y > entity.y
    );
  }
}
//Here we are "drawing", each time this styles will be applied to our player
