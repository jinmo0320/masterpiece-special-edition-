import { checkCollision, determineCollisionSide } from './collision.js';

export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 100;

    this.vx = 5;
    this.vy = 0;
    this.gravity = 0.7;

    this.gameover = false;

    this.jumping = true;
    this.standing = false;
    this.attacking = false;
    this.state = 'down';
    this.direction = 'right';

    this.spriteWidth = 256;
    this.spriteHeight = 256;
    this.frameX = 0;
    this.frameY = 0;
    this.gameFrame = 0;
    this.staggerFrames = 6;
    this.attackGameFrame = 0;

    this.playerSprite = new Image();
    this.playerSprite.src = './image/sprite.png';

    this.bladeImage = new Image();
    this.bladeImage.src = './image/blade.png';
    this.bladeImageL = new Image();
    this.bladeImageL.src = './image/blade(left).png';
  }
  draw(ctx) {
    // ctx.beginPath();
    // ctx.strokeStyle = 'black';
    // ctx.strokeRect(this.x, this.y, this.width, this.height);

    ctx.drawImage(
      this.playerSprite,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x + this.width / 2 - 50,
      this.y,
      this.height,
      this.height
    );
  }
  attack(ctx, on, blockArray) {
    if (on.click) {
      this.attacking = true;
    }
    if (this.attacking && this.frameX !== 0) {
      this.aWidth = 70;
      this.aHeight = 30;
      this.aY = this.y + this.height / 2 - this.aHeight / 2;
      if (this.direction === 'right') this.aX = this.x + this.width;
      else this.aX = this.x - this.aWidth;

      // ctx.beginPath();
      // ctx.strokeStyle = 'red';
      // ctx.strokeRect(this.aX, this.aY, this.aWidth, this.aHeight);

      if (this.direction === 'right') {
        ctx.drawImage(
          this.bladeImage,
          this.aX - this.aWidth,
          this.aY - 5,
          this.aWidth * 2,
          this.aHeight * 2
        );
      } else {
        ctx.drawImage(
          this.bladeImageL,
          this.aX,
          this.aY - 5,
          this.aWidth * 2,
          this.aHeight * 2
        );
      }

      blockArray.forEach((block) => {
        if (!block.isStatic) {
          if (
            this.aX < block.x + block.width &&
            this.aX + this.aWidth > block.x &&
            this.aY < block.y + block.height &&
            this.aY + this.aHeight > block.y
          ) {
            block.isAttacked = true;
          }
        }
      });
      on.click = false;
    }
    console.log(this.frameX);
  }

  animate(on) {
    if (this.attacking) {
      if (this.direction === 'right') {
        this.frameY = 6;
        this.frameX = Math.floor(this.attackGameFrame);
        this.attackGameFrame += 0.4;
        if (this.attackGameFrame > 3) {
          this.attackGameFrame = 0;
          this.attacking = false;
        }
      } else if (this.direction === 'left') {
        this.frameY = 7;
        this.frameX = Math.floor(this.attackGameFrame);
        this.attackGameFrame += 0.4;
        if (this.attackGameFrame > 3) {
          this.attackGameFrame = 0;
          this.attacking = false;
        }
      }
    } else {
      if (!this.jumping) {
        if (on.right) {
          this.frameY = 2;
          this.frameX = Math.floor(this.gameFrame / this.staggerFrames) % 4;
          this.gameFrame++;
        } else if (on.left) {
          this.frameY = 3;
          this.frameX = Math.floor(this.gameFrame / this.staggerFrames) % 4;
          this.gameFrame++;
        } else if (this.direction === 'right') {
          this.frameX = 0;
          this.frameY = 0;
        } else if (this.direction === 'left') {
          this.frameX = 0;
          this.frameY = 1;
        }
      } else if (this.jumping) {
        if (this.state === 'up' && this.direction === 'right') {
          this.frameX = 0;
          this.frameY = 4;
        } else if (this.state === 'down' && this.direction === 'right') {
          this.frameX = 1;
          this.frameY = 4;
        } else if (this.state === 'up' && this.direction === 'left') {
          this.frameX = 0;
          this.frameY = 5;
        } else if (this.state === 'down' && this.direction === 'left') {
          this.frameX = 1;
          this.frameY = 5;
        }
      }
    }
  }

  update(canvas, ctx, on, blockArray) {
    this.y += this.vy;
    this.vy += this.gravity;

    if (this.y > canvas.height) {
      this.gameover = true;
    }

    if (on.space) {
      if (!this.jumping && this.vy < 2) this.vy = -15;
      this.jumping = true;
    }

    if (on.right) {
      this.x += this.vx;
      this.direction = 'right';
    }
    if (on.left) {
      this.x -= this.vx;
      this.direction = 'left';
    }

    if (this.vy >= 0) {
      this.state = 'down';
    } else {
      this.state = 'up';
    }

    blockArray.forEach((block) => {
      if (checkCollision(this, block) === 'collide' && !block.isAttacked) {
        const side = determineCollisionSide(this, block);
        if (side === 'right') {
          this.x -= this.vx;
        }
        if (side === 'left') {
          this.x += this.vx;
        }
        if (side === 'bottom' && this.state === 'down') {
          this.vy = 0;
          this.y = block.y - this.height;
          this.jumping = false;
        }
        if (side === 'top' && this.state === 'up') {
          this.vy = 0;
        }
      }
    });

    this.animate(on);
    this.draw(ctx);
    this.attack(ctx, on, blockArray);
  }
}
