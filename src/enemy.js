export class Enemy {
  constructor(playgroundWidth, playgroundHeight, image) {
    this.image = image;
    this.playgroundWidth = playgroundWidth;
    this.playgroundHeight = playgroundHeight;
    this.width = 145;
    this.height = 145;
    this.x = this.playgroundWidth;
    this.y = this.playgroundHeight - this.height;
    this.frameX = 0;
    this.speed = 5;
    this.maxFrame = 5;
    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
    this.outOfScreen = false;
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    
    /* context.strokeStyle = 'black';
    context.beginPath();
    context.arc(
      this.x + this.width / 2,
      this.y + this.height / 2,
      this.width / 2,
      0,
      360
    );
    context.stroke(); */
  }

  update(time) {
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX < this.maxFrame) {
        this.frameX = 0;
      } else {
        this.frameX += 1;
      }
      this.frameTimer = 0;
    } else {
      this.frameTimer += time;
    }
    this.x -= this.speed;
    if (this.x < 0 - this.width) {
      this.outOfScreen = true;
    }
  }
}
