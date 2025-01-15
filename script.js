const player = document.getElementById("player");
const ball = document.getElementById("ball");
const scoreDisplay = document.getElementById("score");

let playerPosition = window.innerWidth / 2 - 50;
let ballPosition = { x: Math.random() * window.innerWidth, y: 0 };
let score = 0;
let speed = 3;

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
    alert(`Fim de jogo! Sua pontuação foi: ${score}`);
    resetGame();
  }
}

// Reinicia a posição da bola
function resetBall() {
  ballPosition.x = Math.random() * (window.innerWidth - 20);
  ballPosition.y = 0;
}

// Reinicia o jogo
function resetGame() {
  score = 0;
  speed = 3;
  scoreDisplay.textContent = `Pontuação: ${score}`;
  resetBall();
}

// Atualiza o jogo a cada frame
function gameLoop() {
  updateBall();
  requestAnimationFrame(gameLoop);
}

gameLoop();
