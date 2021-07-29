function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.lineTo(x + width - radius, y + height);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.lineTo(x + width, y + radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.lineTo(x + radius, y);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.fill();
  ctx.stroke();
}

export class Block {
  constructor(x, y, side) {
    this.x = x;
    this.y = y;
    this.width = this.height = side;
    this.isAttacked = false;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'black';
    roundedRect(ctx, this.x, this.y, this.width, this.height, 10);
  }
  update(ctx) {
    if (!this.isAttacked) {
      this.draw(ctx);
    }
  }
}
