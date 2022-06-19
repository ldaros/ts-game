export class Level {
  private scene: Phaser.Scene;
  private platforms: Phaser.Physics.Arcade.StaticGroup;
  private lastPlatformY: number = 568;
  private lastPlatformSide: boolean = false;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.platforms = scene.physics.add.staticGroup();

    this.createGround();
  }

  createGround() {
    this.platforms.create(400, 568, "ground").setScale(2).refreshBody();
  }

  public getPlatforms(): Phaser.Physics.Arcade.StaticGroup {
    return this.platforms;
  }

  public getWidth(): number {
    return this.scene.game.config.width as number;
  }

  public getHeight(): number {
    return this.scene.game.config.height as number;
  }

  public generateNewPlatforms() {
    const newPlatformY = this.lastPlatformY - 180;
    const newPlatformSide = !this.lastPlatformSide;

    this.platforms.create(newPlatformSide ? 700 : 100, newPlatformY, "ground");

    this.lastPlatformY = newPlatformY;
    this.lastPlatformSide = newPlatformSide;
  }

  // plataforms that are offscreen are destroyed
  public destroyOffscreenPlatforms(currentHeight: number) {
    this.platforms.children.each((platform) => {
      if (platform.body.position.y > currentHeight + 800) {
        platform.destroy();
      }
    });
  }
}
