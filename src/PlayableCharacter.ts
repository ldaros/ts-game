export class PlayableCharacter extends Phaser.Physics.Arcade.Sprite {
  cursor: Phaser.Types.Input.Keyboard.CursorKeys;
  private speed = 150;
  private jumpSpeed = 0;
  private bounce = 0.1;
  private lastDirection = "right";
  private maxJump = -400;

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

  public renderJumpBar() {
    // render a bar with the jump height
    const bar = this.scene.add.graphics();
    bar.fillStyle(0x52fa43, 1);

    bar.fillRect(this.x + 20, this.y + 20, 5, this.jumpSpeed / 10);

    // destroy the bar after a certain amount of time
    this.scene.time.addEvent({
      delay: 10,
      callback: () => {
        bar.destroy();
      },
    });
  }

  private handleMovement(player: Phaser.Physics.Arcade.Sprite) {
    const { left, right, up } = this.cursor;
    const isOnGround = player.body.touching.down;

    if (up.isDown) this.chargeJump();
    if (up.isUp && isOnGround) this.jump();

    if (isOnGround && up.isUp) {
      if (left.isDown) this.moveLeft();
      else if (right.isDown) this.moveRight();
    }

    if (isOnGround) this.dontMove;
  }

  private jump() {
    this.setVelocityY(this.jumpSpeed);
    const isJumping = this.body.velocity.y < 0;

    if (this.lastDirection === "right" && isJumping) {
      this.moveRight();
    }

    if (this.lastDirection === "left" && isJumping) {
      this.moveLeft();
    }

    if (!isJumping) this.dontMove();

    this.jumpSpeed = 0;
  }

  private dontMove() {
    this.setVelocityX(0);

    if (this.lastDirection === "right") {
      this.anims.play("facingRight", true);
    }

    if (this.lastDirection === "left") {
      this.anims.play("facingLeft", true);
    }
  }

  private moveRight() {
    this.lastDirection = "right";
    this.setVelocityX(this.speed);
    this.anims.play("moveRight", true);
  }

  private moveLeft() {
    this.lastDirection = "left";
    this.setVelocityX(-this.speed);
    this.anims.play("movingLeft", true);
  }

  private chargeJump() {
    this.jumpSpeed -= 20;

    if (this.jumpSpeed < this.maxJump) {
      this.jumpSpeed = this.maxJump;
    }
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

    this.anims.create({
      key: "facingLeft",
      frames: [{ key: "dude", frame: 0 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "facingRight",
      frames: [{ key: "dude", frame: 5 }],
      frameRate: 20,
    });
  }
}
