import Phaser from "phaser";
import { Preload } from "./Preload";
import { PlayableCharacter } from "./PlayableCharacter";
import { Level } from "./Level";

export default class Game extends Phaser.Scene {
  player!: PlayableCharacter;
  level!: Level;
  score: number = 0;
  frameBuffer: number = 0;

  constructor() {
    super("game");
  }

  preload() {
    Preload(this);
  }

  create() {
    this.level = new Level(this);
    this.player = new PlayableCharacter(this, 100, 700);

    this.physics.add.collider(this.player, this.level.getPlatforms());

    this.level.generateNewPlatforms();
    this.level.generateNewPlatforms();
    this.level.generateNewPlatforms();
  }

  update() {
    this.player.update();
    this.player.renderJumpBar();
    this.buildLevel();
    this.updateBuffer();

    this.killPlayer();

    this.updateCamera(this.player.y);
  }

  killPlayer() {
    if (this.player.y > this.level.getHeight()) {
      this.scene.restart();
    }
  }

  private updateCamera(playerY: number) {
    if (playerY - 300 < this.cameras.main.scrollY) {
      this.cameras.main.scrollY -= 1;
    }
  }

  private buildLevel() {
    if (this.frameBuffer % 100 === 0) {
      this.level.generateNewPlatforms();
    }

    this.level.destroyOffscreenPlatforms(this.cameras.main.scrollY);
  }

  private updateBuffer() {
    this.frameBuffer++;
    if (this.frameBuffer > 1000) {
      this.frameBuffer = 0;
    }
  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#b0dbf1",
  width: 600,
  height: 800,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 400 },
      debug: false,
    },
  },
  scene: [Game],
};

new Phaser.Game(config);
