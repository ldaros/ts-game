export const Preload = (scene: Phaser.Scene) => {
  scene.load.image("sky", "/sky.png");
  scene.load.image("ground", "/platform.png");
  scene.load.image("star", "/star.png");
  scene.load.image("bomb", "/bomb.png");
  scene.load.spritesheet("dude", "/dude.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
};
