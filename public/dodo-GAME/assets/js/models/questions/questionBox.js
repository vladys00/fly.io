class QuestionBox {
  constructor(board) {
    this.board = board;
    this.width = 50;
    this.height = 50;

    this.maxWidth = this.board.clientWidth - this.width * 2;
    this.x = Math.floor(
      Math.random() * (this.maxWidth - this.width + 1) + this.width
    );

    this.y = this.board.clientHeight;
    this.sy = 3;
    this.sx = 5;

    this.questionBox = document.createElement("img");
    
    this.questionBox.className = "question-box";
    this.questionBox.style.position = "absolute";
    this.questionBox.setAttribute("src", "/dodo-GAME/assets/img/questionBox.gif");
  }

  draw() {
    this.questionBox.style.width = this.width + "px";
    this.questionBox.style.height = this.height + "px";
    // this.questionBox.style.backgroundColor = "blue";

    this.questionBox.style.bottom = this.y + "px";
    this.questionBox.style.left = this.x + "px";
    this.questionBox.style.backgroundColor = "rgba(255, 255, 0, 0.4)";
    this.questionBox.style.borderRadius = "50%";
    // this.questionBox.style.border = "5px dotted  rgba(252, 255, 0, 0.94)";
    this.questionBox.style.padding = "7px"

    this.board.appendChild(this.questionBox);
  }

  move() {
    this.y -= this.sy;
  }
}
