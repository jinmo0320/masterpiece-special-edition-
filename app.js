import { Particle } from './particle.js';
import { levels } from './level/levels.js';

class App {
  constructor() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.init();

    this.on = {
      right: false,
      left: false,
      space: false,
      click: false,
    };

    document.addEventListener('keydown', this.onMove.bind(this));
    document.addEventListener('keyup', this.offMove.bind(this));
    document.addEventListener('keydown', this.onSpace.bind(this));
    document.addEventListener('keyup', this.offSpace.bind(this));
    document.addEventListener('mousedown', this.onClick.bind(this));
    document.addEventListener('mouseup', this.offClick.bind(this));

    this.levelBox = document.getElementById('level-box');
    this.controlBox = document.getElementById('control-box');
    this.startBtn = document.getElementById('start-btn');
    this.levelBtn = document.querySelectorAll('#level-btn');
    this.title = document.getElementById('title');
    this.restartBtn = document.getElementById('restart-btn');
    this.homeBtn = document.getElementById('home-btn');
    this.listBtn = document.getElementById('list-btn');

    this.level;
    this.player;
    this.blockArray;
    this.goalArray;

    this.startBtn.addEventListener('click', this.onStartBtn.bind(this));
    this.restartBtn.addEventListener('click', this.levelInit.bind(this));
    this.homeBtn.addEventListener('click', this.onHomeBtn.bind(this));
    this.listBtn.addEventListener('click', this.onListBtn.bind(this));

    this.levelBtn[0].addEventListener('click', () => {
      this.level = 'one';
      this.levelInit();
    });
    this.levelBtn[1].addEventListener('click', () => {
      this.level = 'two';
      this.levelInit();
    });
  }
  init() {
    this.canvas.width = 1000;
    this.canvas.height = 600;

    this.particleArray = [];

    for (let i = 0; i < 50; i++) {
      this.particleArray.push(new Particle(this.canvas));
    }
  }
  animate() {
    this.myAnimation = window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.blockArray.forEach((block) => {
      block.update(this.ctx, this.player);
    });
    this.player.update(this.canvas, this.ctx, this.on, this.blockArray);

    let goalCheck = [];
    this.goalArray.forEach((goal) => {
      goal.update(this.ctx, this.player);
      goalCheck.push(goal.isAttacked);
    });

    if (this.player.gameover) {
      this.title.innerHTML = 'Game Over!';
      this.controlBox.style.display = 'block';
      cancelAnimationFrame(this.myAnimation);
    }
    if (!goalCheck.includes(false)) {
      this.title.innerHTML = 'Game Clear!';
      this.controlBox.style.display = 'block';
      cancelAnimationFrame(this.myAnimation);
    }
  }

  onMove(e) {
    if (e.keyCode === 68) {
      this.on.right = true;
      this.on.left = false;
    }
    if (e.keyCode === 65) {
      this.on.right = false;
      this.on.left = true;
    }
  }

  offMove(e) {
    if (e.keyCode === 68) {
      this.on.right = false;
    }
    if (e.keyCode === 65) {
      this.on.left = false;
    }
  }

  onSpace(e) {
    if (e.keyCode === 32) {
      this.on.space = true;
    }
  }

  offSpace(e) {
    if (e.keyCode === 32) {
      this.on.space = false;
    }
  }

  onClick(e) {
    this.on.click = true;
  }
  offClick(e) {
    this.on.click = false;
  }

  onStartBtn() {
    this.startBtn.style.display = 'none';
    this.levelBox.style.display = 'block';
    this.controlBox.style.display = 'none';
  }
  onHomeBtn() {
    this.startBtn.style.display = 'block';
    this.levelBox.style.display = 'none';
    this.controlBox.style.display = 'none';
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  onListBtn() {
    this.startBtn.style.display = 'none';
    this.levelBox.style.display = 'block';
    this.controlBox.style.display = 'none';
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  levelInit() {
    this.startBtn.style.display = 'none';
    this.levelBox.style.display = 'none';
    this.controlBox.style.display = 'none';

    const level = levels[this.level];
    level.set();
    this.player = level.player;
    this.blockArray = level.blockArray;
    this.goalArray = level.goalArray;

    this.animate();
  }
}

new App();
