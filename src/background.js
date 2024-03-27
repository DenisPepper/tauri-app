export class Background {
  constructor(playgroundWidth, playgroundHeight, image) {
    this.image = image;
    this.playgroundWidth = playgroundWidth;
    this.playgroundHeight = playgroundHeight;
    this.width = 1920;
    this.height = 700;
    this.x = 0;
    this.y = 0;
    this.speed = 1;
  }

  draw(context) {
    //context.fillStyle = 'white';
    //context.fillRect(this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.x, this.y);
    context.drawImage(this.image, this.x + this.width, this.y);
  }

  update() {
    this.x -= this.speed;
    if (this.x < 0 - this.width) this.x = 0;
  }
}
