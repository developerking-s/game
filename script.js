const menu = document.getElementById("menu");
const gameContainer = document.getElementById("game-container");
const player = document.getElementById("player");
const ball = document.getElementById("ball");
const scoreDisplay = document.getElementById("score");
const gameOverScreen = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");

let playerPosition = window.innerWidth / 2 - 50;
let ballPosition = { x: Math.random() * window.innerWidth, y: 0 };
let score = 0;
let speed = 3;
let gameInterval = null;

// Movimenta o jogador
document.addEventListener("mousemove", (e) => {
  playerPosition = e.clientX - 50;
  player.style.left = `${playerPosition}px`;
});

// Atualiza a posição da bola
function updateBall() {
  ballPosition.y += speed;
  ball.style.top = `${ballPosition.y}px`;
  ball.style.left = `${ballPosition.x}px`;

  // Verifica se a bola foi capturada
  const playerRect = player.getBoundingClientRect();
  const ballRect = ball.getBoundingClientRect();

  if (
    ballRect.bottom >= playerRect.top &&
    ballRect.left >= playerRect.left &&
    ballRect.right <= playerRect.right
  ) {
    score++;
    scoreDisplay.textContent = `Pontuação: ${score}`;
    resetBall();
    speed += 0.2; // Aumenta a dificuldade
  }

  // Verifica se a bola passou
  if (ballPosition.y > window.innerHeight) {
    endGame();
  }
}

// Reinicia a posição da bola
function resetBall() {
  ballPosition.x = Math.random() * (window.innerWidth - 20);
  ballPosition.y = 0;
}

// Inicia o jogo
function startGame() {
  score = 0;
  speed = 3;
  scoreDisplay.textContent = `Pontuação: ${score}`;
  scoreDisplay.style.visibility = "visible";
  menu.classList.remove("active");
  gameOverScreen.classList.remove("active");
  resetBall();
  gameInterval = setInterval(updateBall, 16);
}

// Termina o jogo
function endGame() {
  clearInterval(gameInterval);
  finalScore.textContent = `Sua pontuação: ${score}`;
  gameOverScreen.classList.add("active");
  scoreDisplay.style.visibility = "hidden";
}

// Eventos de início e reinício
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);

// Exibe o menu inicial
menu.classList.add("active");
