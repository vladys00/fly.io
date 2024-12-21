
class Game {
  
  constructor(board) {
    this.board = board;
    // this.initData();
    

    this.background = new Background(this.board);
    this.questionManager = new Question(this);
    this.player = new Player(this.board);
    this.liveCounter = new LiveCounter(this.board, this.player.lives);

    this.playAgain = document.getElementById("play-again");
    this.points = document.getElementById("counter-num");
    this.gameOver = document.getElementById("game-over");
    this.questionDiv = document.getElementById("questionBox");
    this.imageBox = document.getElementById("img-div");
    this.finalScore = document.getElementById("finalScore");
    this.correctAnswerPop = document.getElementById("correct-answer");
    this.incorrectAnswerPop = document.getElementById("incorrect-answer");

    this.pointsSound = document.getElementById("points-sound");
    this.powerUpSound = document.getElementById("power-up");
    this.gameOverSound = document.getElementById("game-over_sound");
    this.enemyHitSound = document.getElementById("enemy-hit");

    this.possibleQuestions = questionsData;
    this.questions = [];
    this.questionTick = 600;
    this.Qtick = 0;

    this.speedDecay = 0;

    this.slowSnail = false;

    this.interval;

    this.scoreNum = 0;

    this.crabs = [];
    this.crabTick = 950;

    this.snails = [];
    this.snailsTick = 750;

    this.rocks = [];
    this.rockTick = 100;

    this.nuts = [];
    this.nutTick = 125;

    this.enemies = [];
    this.enemytick = 750;
    this.tick = 0;

    this.ratsEnemies = [];
    this.ratEnemyTick = 150;

    this.pigsEnemies = [];
    this.pigEnemyTick = 185;
  }
  initData() {}

  start() {

    this.interval = setInterval(() => {
      this.checkCollision();
      this.draw();
      this.move();
      this.tick++;
      this.Qtick++;

      if (this.tick % 1000 === 0) {
        this.pigEnemyTick -= 10;
      }
      if (this.tick % 2150 === 0) {
        this.ratEnemyTick -= 10;
      }
      if (this.tick % 3200 === 0) {
        this.enemytick -= 15;
      }

      if (this.tick % this.enemytick === 0) {
        this.enemies.push(new Enemy(this.board, this.speedDecay));
      }

      if (this.tick % this.ratEnemyTick === 0) {
        this.ratsEnemies.push(new RatEnemy(this.board, this.speedDecay));
      }
      if (this.tick % this.pigEnemyTick === 0) {
        this.pigsEnemies.push(new PigEnemy(this.board, this.speedDecay));
      }

      if (this.Qtick % this.questionTick === 0) {
        this.questions.push(new QuestionBox(this.board));
      }

      if (this.tick % this.rockTick === 0) {
        this.rocks.push(new RockPoints(this.board));
      }

      if (this.tick % this.nutTick === 0) {
        this.nuts.push(new NutPoints(this.board));
      }

      if (this.tick % this.crabTick === 0) {
        this.crabs.push(new PowerCrab(this.board));
      }

      if (this.tick % this.snailsTick === 0) {
        this.snails.push(new SlowSnail(this.board));
      }
      this.cleanUp();

      this.liveCounter.draw();
    }, 1000 / 60);
  }

  cleanUp() {
    this.enemies = this.enemies.filter((enemy) => {
      if (enemy.y < -enemy.height) {
        enemy.element.remove();
        return false;
      } else {
        return true;
      }
    });
    this.ratsEnemies = this.ratsEnemies.filter((rat) => {
      if (rat.y < -rat.height) {
        rat.element.remove();
        return false;
      } else {
        return true;
      }
    });
    this.pigsEnemies = this.pigsEnemies.filter((pig) => {
      if (pig.y < -pig.height) {
        pig.element.remove();
        return false;
      } else {
        return true;
      }
    });
  }

  move() {
    this.player.move();
    this.background.move(this.player);

    this.enemies.forEach((enemy) => {
      enemy.move();
    });
    this.ratsEnemies.forEach((rat) => {
      rat.move();
    });
    this.pigsEnemies.forEach((pig) => {
      pig.move();
    });

    this.questions.forEach((question) => {
      question.move();
    });
    this.rocks.forEach((rock) => {
      rock.move();
    });
    this.nuts.forEach((nut) => {
      nut.move();
    });
    this.crabs.forEach((crab) => {
      crab.move();
    });

    this.snails.forEach((snail) => {
      snail.move();
    });
  }

  draw() {
    this.points.innerHTML = `${this.scoreNum}`;
    this.background.draw();
    this.player.draw();
    this.enemies.forEach((enemy) => {
      enemy.draw();
    });
    this.ratsEnemies.forEach((rat) => {
      rat.draw();
    });
    this.pigsEnemies.forEach((pig) => {
      pig.draw();
    });
    this.questions.forEach((question) => {
      question.draw();
    });
    this.rocks.forEach((rock) => {
      rock.draw();
    });
    this.nuts.forEach((nut) => {
      nut.draw();
    });
    this.crabs.forEach((crab) => {
      crab.draw();
    });
    this.snails.forEach((snail) => {
      snail.draw();
    });
  }

  checkCollision() {
    const enemy = this.enemies.find((enemy) => {
      return this.player.collideWith(enemy);
    });

    if (enemy) {
      this.enemyHitSound.play();
      this.enemies = this.enemies.filter((passedEnemy) => {
        return passedEnemy !== enemy;
      });
      this.scoreNum -= 15;
      if (!this.crabPower) {
        enemy.element.remove();
        if (this.scoreNum < 0) {
          this.scoreNum = 0;
        }
        this.player.lives -= 1;
        this.liveCounter.lives = this.player.lives;
        this.liveCounter.draw();
      }

      if (this.player.lives === 0) {
        window.clearInterval(this.interval);
        this.draw();
        this.finalScore.innerHTML = `${this.scoreNum}`;
        this.gameOver.style.display = "flex";
        this.gameOverSound.play();
        let score = this.scoreNum;
        return axios.post('http://localhost:3000/savepoints', { score })
       
        console.log("**SCORE***-->", score)
        
      }
    }

    const rat = this.ratsEnemies.find((rat) => {
      return this.player.collideWith(rat);
    });

    if (rat) {
      this.enemyHitSound.play();
      this.ratsEnemies = this.ratsEnemies.filter((passedRat) => {
        return passedRat !== rat;
      });
      if (!this.crabPower) {
        rat.element.remove();
        this.scoreNum -= 10;
        if (this.scoreNum < 0) {
          this.scoreNum = 0;
        }
        this.player.lives -= 1;
        this.liveCounter.lives = this.player.lives;
        this.liveCounter.draw();
      }

      if (this.player.lives === 0) {
        window.clearInterval(this.interval);
        this.draw();
        this.finalScore.innerHTML = `${this.scoreNum}`;
        this.gameOver.style.display = "flex";
        this.gameOverSound.play();
        let score = this.scoreNum;
        return axios.post('http://localhost:3000/savepoints', { score })
     
      
        console.log("**SCORE***-->", score)
      
      }
    }

    const pig = this.pigsEnemies.find((pig) => {
      return this.player.collideWith(pig);
    });

    if (pig) {
      this.enemyHitSound.play();
      this.pigsEnemies = this.pigsEnemies.filter((passedPig) => {
        return passedPig !== pig;
      });

      if (!this.crabPower) {
        pig.element.remove();
        this.scoreNum -= 10;
        if (this.scoreNum < 0) {
          this.scoreNum = 0;
        }

        this.player.lives -= 1;
        this.liveCounter.lives = this.player.lives;
        this.liveCounter.draw();
      }

      if (this.player.lives === 0) {
        window.clearInterval(this.interval);
        this.draw();
        this.finalScore.innerHTML = `${this.scoreNum}`;
        this.gameOver.style.display = "flex";
        this.gameOverSound.play();
        let score = this.scoreNum;
        return axios.post('http://localhost:3000/savepoints', { score})
        
        
        console.log("**SCORE***-->", score)
      }
    }

    const collidedQuestion = this.questions.find((question) => {
      return this.player.collideWith(question);
    });

    if (collidedQuestion) {
      this.powerUpSound.play();
      this.randomNumber = Math.floor(Math.random() * 15);
      this.question = this.possibleQuestions[this.randomNumber];
      window.clearInterval(this.interval);

      this.imageBox.src = `/dodo-GAME/assets/questionsPNG/${this.question.questionSrc}.png`;
      this.questionDiv.style.display = "flex";

      this.questions = this.questions.filter((question) => {
        return collidedQuestion !== question;
      });
      if (this.player.lives === 0) {
        this.finalScore.innerHTML = `${this.scoreNum}`;
        window.clearInterval(this.interval);
        this.gameOver.style.display = "flex";
        this.gameOverSound.play();
        let score = this.scoreNum;
        return axios.post('http://localhost:3000/savepoints', { score })


       
        console.log("**SCORE***-->", score)
      }
    }

    const rock = this.rocks.find((rock) => {
      return this.player.collideWith(rock);
    });
    if (rock) {
      this.pointsSound.play();
      rock.element.remove();
      this.rocks = this.rocks.filter((passedRock) => {
        return passedRock !== rock;
      });
      this.scoreNum += 10;
    }
    const nut = this.nuts.find((nut) => {
      return this.player.collideWith(nut);
    });
    if (nut) {
      this.pointsSound.play();
      nut.element.remove();
      this.nuts = this.nuts.filter((passedNut) => {
        return passedNut !== nut;
      });
      this.scoreNum += 15;
    }

    const crab = this.crabs.find((crab) => {
      return this.player.collideWith(crab);
    });
    if (crab) {
      this.powerUpSound.play();
      crab.element.remove();
      this.crabPower = true;
      this.crabs = this.crabs.filter((passedNut) => {
        return passedNut !== crab;
      });
      this.player.element.style.backgroundColor = "rgba(255, 165, 0, 0.3)";
      this.player.element.style.borderRadius = "50%";
      this.player.element.style.padding = "6px";
      this.player.sx += 5;
      this.player.sy += 5;
      setTimeout(() => {
        this.crabPower = false;
        this.player.sx -= 5;
        this.player.sy -= 5;
        this.player.element.style.removeProperty("background-color");
        this.player.element.style.removeProperty("borderRadius");
        this.player.element.style.removeProperty("padding");
      }, 5000);
    }
    const snail = this.snails.find((snail) => {
      return this.player.collideWith(snail);
    });
    if (snail) {
      this.powerUpSound.play();
      snail.element.remove();
      this.snails = this.snails.filter((passedSnail) => {
        return passedSnail !== snail;
      });
      this.player.element.style.backgroundColor = "rgba(255, 165, 0, 0.3)";
      this.player.element.style.borderRadius = "50%";
      this.player.element.style.padding = "6px";
      this.speedDecay = 4;

      setTimeout(() => {
        this.speedDecay = 0;
        this.player.element.style.removeProperty("background-color");
        this.player.element.style.removeProperty("borderRadius");
        this.player.element.style.removeProperty("padding");
      }, 10000);
    }
    
  }
}
