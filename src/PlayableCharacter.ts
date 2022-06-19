export class PlayableCharacter extends Phaser.Physics.Arcade.Sprite {
  cursor: Phaser.Types.Input.Keyboard.CursorKeys;
  private speed = 150;
  private jumpSpeed = -400;
  private bounce = 0.1;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "dude");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setBounce(this.bounce);
    this.createAnimations();

    this.cursor = scene.input.keyboard.createCursorKeys();
  }

  update() {
    this.handleMovement(this);
  }

  private handleMovement(player: Phaser.Physics.Arcade.Sprite) {
    const { left, right, up } = this.cursor;

    if (left.isDown) this.moveLeft();
    else if (right.isDown) this.moveRight();
    else this.dontMove();

    const isOnGround = player.body.touching.down;
    if (up.isDown && isOnGround) this.jump();
  }

  private jump() {
    this.setVelocityY(this.jumpSpeed);
  }

  private dontMove() {
    this.setVelocityX(0);
    this.anims.play("standStill");
  }

  private moveRight() {
    this.setVelocityX(this.speed);
    this.anims.play("moveRight", true);
  }

  private moveLeft() {
    this.setVelocityX(-this.speed);
    this.anims.play("movingLeft", true);
  }

  private createAnimations() {
    this.anims.create({
      key: "movingLeft",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "standStill",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "moveRight",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
