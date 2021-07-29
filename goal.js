export class Goal {
  constructor(x, y, side) {
    this.x = x;
    this.y = y;
    this.width = this.height = side;
    this.arcX = this.x + this.width / 2;
    this.arcY = this.y + this.height / 2;
    this.radius = side / 2;

    this.isAttacked = false;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'yellow';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  update(ctx, player) {
    if (
      player.aX < this.x + this.width &&
      player.aX + player.aWidth > this.x &&
      player.aY < this.y + this.height &&
      player.aY + player.aHeight > this.y
    ) {
      this.isAttacked = true;
    }
    if (!this.isAttacked) {
      this.draw(ctx);
    }
  }
}
