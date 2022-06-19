export const Preload = (scene: Phaser.Scene) => {
  scene.load.image("ground", "/ts-game/platform.png");
  scene.load.spritesheet("dude", "/ts-game/dude.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
};
