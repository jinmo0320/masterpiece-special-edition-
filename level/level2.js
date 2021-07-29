import { Player } from '../player.js';
import { Block } from '../block.js';
import { Goal } from '../goal.js';

export class Level2 {
  constructor() {
    this.player;
    this.blockArray;
    this.goal;
  }
  setPlayer() {
    const pX = 180;
    const pY = 0;

    this.player = new Player(pX, pY);
  }
  setBlocks() {
    const side = 80;
    const b1 = new Block(100 + 0, 500, side);
    const b2 = new Block(100 + side, 500, side);
    const b3 = new Block(100 + side * 2, 500, side);
    const b4 = new Block(100 + side * 3, 420, side);
    const b5 = new Block(100 + side * 7, 300, side);

    this.blockArray = [b1, b2, b3, b4, b5];
  }
  setGoal() {
    const gSide = 40;

    const g1 = new Goal(680, 260, gSide);
    const g2 = new Goal(680, 460, gSide);

    this.goalArray = [g1, g2];
  }
  set() {
    this.setPlayer();
    this.setBlocks();
    this.setGoal();
  }
}
