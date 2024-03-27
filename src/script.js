import { ActionsHandler } from './actions-handler.js';
import { Background } from './background.js';
import { Enemy } from './enemy.js';
import { Player } from './player.js';
import { PLAYGROUND_WIDTH, PLAYGROUND_HEIGHT, DEFAULT_TOTAL } from './settings.js';

const TOTAL = localStorage.getItem('enemyCount') || DEFAULT_TOTAL;
let PAGE_IS_LOAD = false;
const canvas = document.querySelector('.canvas');
canvas.width = PLAYGROUND_WIDTH;
canvas.height = PLAYGROUND_HEIGHT;
const context = canvas.getContext('2d');

const playerImage = document.querySelector('.player-image');
const bgImage = document.querySelector('.background-image');
const enemyImage = document.querySelector('.enemy-image');
const mainTitle = document.querySelector('.main-title');
const description = document.querySelector('.description');
const startButton = document.querySelector('.start-button');
const controls = document.querySelector('.controls');

const actions = new ActionsHandler();
const player = new Player(canvas.width, canvas.height, playerImage);
const background = new Background(canvas.width, canvas.height, bgImage);

let enemies = [];
let enemyLastTime = 0;
let enemyTimer = 0;
let enemyInterval = 2000;
let randomEnemyInterval = Math.random() * 1500 + 1000;

let score = 0;

function drawScore() {
  context.fillStyle = 'black';
  context.font = '40px Helvetica';
  context.fillText(`сугробы: ${score} из ${TOTAL}`, 20, 50);
}

function addEnemy(enemyDeltaTime) {
  if (enemyTimer > enemyInterval + randomEnemyInterval) {
    enemies.push(new Enemy(canvas.width, canvas.height, enemyImage));
    enemyTimer = 0;
  } else {
    enemyTimer += enemyDeltaTime;
  }
  enemies.forEach((enemy) => {
    enemy.draw(context);
    enemy.update(enemyDeltaTime, score);
  });
  enemies = enemies.filter((enemy) => {
    if (enemy.outOfScreen) score += 1;
    return !enemy.outOfScreen;
  });
}

function showHappyEnd() {
  localStorage.removeItem('enemyCount');
  document.location.href = '/success.html';
}

function animate(timeStamp) {
  const enemyDeltaTime = timeStamp - enemyLastTime;
  enemyLastTime = timeStamp;

  context.clearRect(0, 0, canvas.width, canvas.height);

  background.draw(context);
  background.update();

  player.draw(context);
  player.update(actions, enemies);

  drawScore();

  addEnemy(enemyDeltaTime);

  if (score === TOTAL) return showHappyEnd();

  if (player.gameOver) {
    context.fillStyle = 'black';
    context.font = '80px Helvetica';
    context.fillText('GAME OVER', 120, 200);
    localStorage.removeItem('enemyCount');
    setTimeout(() => window.location.reload(), 1500);
  } else {
    requestAnimationFrame(animate);
  }
}

window.addEventListener('load', () => {
  PAGE_IS_LOAD = true;
});

window.addEventListener('keydown', (evt) => {
  if (evt.code === 'Space') {
    window.location.reload();
  }
});

startButton.addEventListener('click', () => {
  if (!PAGE_IS_LOAD) return;
  mainTitle.classList.add('hide');
  description.classList.add('hide');
  startButton.classList.add('hide');
  controls.classList.add('hide');
  canvas.classList.remove('hide');
  //document.body.classList.remove('with-background');
  animate(enemyLastTime);
});
