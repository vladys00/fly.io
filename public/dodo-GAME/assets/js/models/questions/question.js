class Question {
  constructor(game) {
    this.setUpFormListener();
    this.game = game;
    this.rightAnswer = document.getElementById("right-answer");
    this.wrongAnswer = document.getElementById("wrong-answer");
  }

  setUpFormListener() {
    const form = document.getElementById("form");

    form.onsubmit = (event) => {
      const value = document.getElementById("answer").value;
      event.preventDefault();

      this.checkQuestion(value === this.game.question.correctOption);
    };
  }

  checkQuestion(result) {
    if (result === true) {
      this.game.scoreNum += 25;
      this.rightAnswer.play();
      console.log("acertó");
      this.game.correctAnswerPop.style.display = "flex";
      setTimeout(() => {
        this.game.correctAnswerPop.style.display = "none";
      }, 1000);
      if (this.game.player.lives < 4) {
        this.game.player.lives += 1;
      }
      this.game.liveCounter.lives = this.game.player.lives;
      this.game.liveCounter.draw();
    } else {
      this.wrongAnswer.play();
      this.game.scoreNum -= 25;
      if (this.game.scoreNum < 0) {
        this.game.scoreNum = 0;
      }
      console.log("falló");
      this.game.incorrectAnswerPop.style.display = "flex";
      setTimeout(() => {
        this.game.incorrectAnswerPop.style.display = "none";
      }, 1000);
      this.game.player.lives -= 1;
      this.game.liveCounter.lives = this.game.player.lives;
      if (this.game.player.lives === 0) {
        this.game.draw();
        console.log("END GAME!!");
        console.log(this.game.interval);
        clearInterval(this.game.interval);
        this.game.finalScore.innerHTML = `${this.game.scoreNum}`;
        this.game.gameOver.style.display = "flex";
      }
      this.game.liveCounter.draw();
    }

    this.game.questionDiv.style.display = "none";
    if (this.game.player.lives > 0) {
      this.game.start();
    }
    if (result === true) {
      this.game.correctAnswerPop.style.display = "flex";
    } else {
      this.game.incorrectAnswerPop.style.display = "flex";
    }
  }
}
