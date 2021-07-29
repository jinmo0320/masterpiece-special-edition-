export function checkCollision(r1, r2) {
  if (
    r1.x < r2.x + r2.width &&
    r1.x + r1.width > r2.x &&
    r1.y < r2.y + r2.height &&
    r1.y + r1.height > r2.y
  ) {
    return 'collide';
  }
}

function detectCollisionSide(r1, r2) {
  let collisionList = [];
  if (r1.x + r1.width < r2.x + r2.width && r1.x + r1.width > r2.x) {
    collisionList.push('right');
  }
  if (r1.x < r2.x + r2.width && r1.x > r2.x) {
    collisionList.push('left');
  }
  if (r1.y + r1.height < r2.y + r2.height && r1.y + r1.height > r2.y) {
    collisionList.push('bottom');
  }
  if (r1.y < r2.y + r2.height && r1.y > r2.y) {
    collisionList.push('top');
  }
  return collisionList;
}

export function determineCollisionSide(r1, r2) {
  let collision;
  const list = detectCollisionSide(r1, r2);
  if (list.length > 1) {
    if (list.includes('right') && list.includes('bottom')) {
      const dx = Math.abs(r1.x + r1.width - r2.x);
      const dy = Math.abs(r1.y + r1.height - r2.y);
      if (dx >= dy) {
        collision = 'bottom';
      } else {
        collision = 'right';
      }
    }
    if (list.includes('right') && list.includes('top')) {
      const dx = Math.abs(r1.x + r1.width - r2.x);
      const dy = Math.abs(r2.y + r2.height - r1.y);
      if (dx >= dy) {
        collision = 'top';
      } else {
        collision = 'right';
      }
    }
    if (list.includes('left') && list.includes('bottom')) {
      const dx = Math.abs(r2.x + r2.width - r1.x);
      const dy = Math.abs(r1.y + r1.height - r2.y);
      if (dx >= dy) {
        collision = 'bottom';
      } else {
        collision = 'left';
      }
    }
    if (list.includes('left') && list.includes('top')) {
      const dx = Math.abs(r2.x + r2.width - r1.x);
      const dy = Math.abs(r2.y + r2.height - r1.y);
      if (dx >= dy) {
        collision = 'top';
      } else {
        collision = 'left';
      }
    }
  } else {
    collision = list[0];
  }

  return collision;
}
