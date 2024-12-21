window.addEventListener("load", function () {
  const startBtn = document.getElementById("start-btn");
  const board = document.getElementById("game-board");
  const description = document.getElementById("game-description");
  const startGameMusic = document.getElementById("game-start");
  const backgroundMusic = document.getElementById("backgroundMusic");
  
  
  const game = new Game(board);

  startBtn.addEventListener("click", function () {
    startBtn.style.display = "none";
    description.style.display = "none";
    game.start();
    startGameMusic.play();
    backgroundMusic.play();
  });
});
