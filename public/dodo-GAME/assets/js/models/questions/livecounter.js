class LiveCounter {
  constructor(board, lives) {
    this.lives = lives;
    this.board = board;

    this.width = 35;
    this.height = 35;

    this.body = document.body;

    this.element = document.createElement("img");
    this.element.setAttribute("src", "/dodo-GAME/assets/img/pixel-heart.gif");
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.position = "absolute";
    this.element.className = "hearts";

    this.offSetHeart = 30;
    this.spacingHeart = 15;
  }

  draw() {
    const hearts = this.body.querySelectorAll(".hearts");

    hearts.forEach((heart) => {
      heart.remove();
    });

    Array(this.lives)
      .fill("x")
      .forEach((_, index) => {
        this.element.style.left = `${
          this.offSetHeart + index * (this.width + this.spacingHeart)
        }px`;
        this.element.style.top = "30px";

        document.body.appendChild(this.element.cloneNode());
      });
  }
}
