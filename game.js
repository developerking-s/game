// Configuração inicial do jogo
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [MenuScene, GameScene]
};

// Inicializa o jogo
const game = new Phaser.Game(config);

// Cena do Menu
class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  preload() {
    this.load.image("background", "https://i.imgur.com/3e8cA3U.png");
  }

  create() {
    this.add.image(400, 300, "background").setScale(2);
    const startText = this.add.text(400, 300, "Start Game", {
      font: "32px Arial",
      fill: "#fff"
    });
    startText.setOrigin(0.5, 0.5);
    startText.setInteractive();

    startText.on("pointerdown", () => {
      this.scene.start("GameScene");
    });
  }
}

// Cena do Jogo
class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("tiles", "https://i.imgur.com/z7RZdP3.png");
    this.load.image("player", "https://i.imgur.com/Q6f0nLk.png");
  }

  create() {
    // Cria o mapa
    this.add.tileSprite(400, 300, 800, 600, "tiles");

    // Adiciona o jogador
    this.player = this.physics.add.sprite(400, 300, "player");
    this.player.setCollideWorldBounds(true);

    // Configura os controles
    this.cursors = this.input.keyboard.createCursorKeys();

    // Suporte para dispositivos móveis
    this.input.addPointer();
    this.add.text(10, 10, "Use setas ou toque para mover.", {
      font: "16px Arial",
      fill: "#fff"
    });
  }

  update() {
    const speed = 200;

    // Movimento do jogador
    if (this.cursors.left.isDown || this.input.pointer1.isDown) {
      this.player.setVelocityX(-speed);
    } else if (this.cursors.right.isDown || this.input.pointer2.isDown) {
      this.player.setVelocityX(speed);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
    } else {
      this.player.setVelocityY(0);
    }
  }
}