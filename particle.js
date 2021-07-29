export class Particle {
  constructor(canvas) {
    this.x = Math.random() * canvas.width;
    this.y =
      Math.random() * (canvas.height - canvas.height / 2) + canvas.height / 2;
    this.side = Math.random() * (10 - 2) + 2;
    this.vy = Math.random() * (3 - 1) + 1;
    this.ms = 0.1;
  }
  draw(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, this.side, this.side);
  }
  update(canvas, ctx) {
    this.y -= this.vy;
    this.side -= this.ms;
    if (this.side < 0) {
      this.x = Math.random() * canvas.width;
      this.y =
        Math.random() * (canvas.height - canvas.height / 2) + canvas.height / 2;
      this.side = Math.random() * (10 - 2) + 2;
      this.vy = Math.random() * (2 - 1) + 1;
    }
    this.draw(ctx);
  }
}
