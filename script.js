const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

// Configurações
let isPlaying = false;
let player = { x: 50, y: 300, width: 50, height: 50, speed: 5, image: null };
let items = [];
let score = 0;

// Inicia o Jogo
document.getElementById("startButton").addEventListener("click", () => {
  document.getElementById("menu").style.display = "none";
  canvas.style.display = "block";
  startGame();
});

// Carrega Imagens
const loadImage = (src) => {
  const img = new Image();
  img.src = src;
  return img;
};

player.image = loadImage("assets/player.png");

// Controle do Personagem
document.addEventListener("keydown", (e) => {
  if (!isPlaying) return;

  if (e.key === "ArrowRight") player.x += player.speed;
  if (e.key === "ArrowLeft") player.x -= player.speed;
  if (e.key === "ArrowUp") player.y -= player.speed;
  if (e.key === "ArrowDown") player.y += player.speed;

  // Limites
  if (player.x < 0) player.x = 0;
  if (player.y < 0) player.y = 0;
  if (player.x > canvas.width - player.width) player.x = canvas.width - player.width;
  if (player.y > canvas.height - player.height) player.y = canvas.height - player.height;
});

// Gera itens coletáveis
function spawnItem() {
  const item = {
    x: Math.random() * (canvas.width - 30),
    y: Math.random() * (canvas.height - 30),
    width: 30,
    height: 30,
    image: loadImage("assets/item.png"),
  };
  items.push(item);
}

// Inicia o Loop do Jogo
function startGame() {
  isPlaying = true;
  score = 0;
  items = [];
  spawnItem();
  gameLoop();
}

// Loop Principal do Jogo
function gameLoop() {
  if (!isPlaying) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha o jogador
  ctx.drawImage(player.image, player.x, player.y, player.width, player.height);

  // Desenha os itens
  items.forEach((item, index) => {
    ctx.drawImage(item.image, item.x, item.y, item.width, item.height);

    // Colisão
    if (
      player.x < item.x + item.width &&
      player.x + player.width > item.x &&
      player.y < item.y + item.height &&
      player.y + player.height > item.y
    ) {
      items.splice(index, 1);
      score++;
      spawnItem();
    }
  });

  // Exibe o placar
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);

  requestAnimationFrame(gameLoop);
}