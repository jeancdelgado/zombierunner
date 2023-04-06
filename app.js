// Select game elements
const gameContainer = document.querySelector('#game-container');
const character = document.querySelector('#character');
const scoreContainer = document.querySelector('#score');
const gameOverContainer = document.querySelector('#game-over-container');
const restartButton = document.querySelector('#restart-button');

// Set up game variables
let score = 0;
let gameSpeed = 2;
let isGameOver = false;

// Create game loop
function gameLoop() {
  if (!isGameOver) {
    // Update score
    score += 1;
    scoreContainer.textContent = score;

    // Update obstacle and power-up positions
    const obstacles = document.querySelectorAll('.obstacle');
    const powerUps = document.querySelectorAll('.power-up');
    obstacles.forEach((obstacle) => {
      obstacle.style.left = obstacle.offsetLeft - gameSpeed + 'px';
      if (obstacle.offsetLeft < -100) {
        obstacle.parentNode.removeChild(obstacle);
      }
    });
    powerUps.forEach((powerUp) => {
      powerUp.style.left = powerUp.offsetLeft - gameSpeed + 'px';
      if (powerUp.offsetLeft < -100) {
        powerUp.parentNode.removeChild(powerUp);
      }
    });

    // Check for collisions
    const collision = checkCollision();
    if (collision) {
      gameOver();
    }

    // Handle jumping
    handleJump();

    // Repeat game loop
    window.requestAnimationFrame(gameLoop);
  }
}

// Start game loop
gameLoop();

// Check for collisions
function checkCollision() {
  const obstacles = document.querySelectorAll('.obstacle');
  const powerUps = document.querySelectorAll('.power-up');
  const characterRect = character.getBoundingClientRect();
  let collision = false;
  obstacles.forEach((obstacle) => {
    const obstacleRect = obstacle.getBoundingClientRect();
    if (characterRect.bottom >= obstacleRect.top && characterRect.top <= obstacleRect.bottom &&
        characterRect.right >= obstacleRect.left && characterRect.left <= obstacleRect.right) {
      collision = true;
    }
  });
  powerUps.forEach((powerUp) => {
    const powerUpRect = powerUp.getBoundingClientRect();
    if (characterRect.bottom >= powerUpRect.top && characterRect.top <= powerUpRect.bottom &&
        characterRect.right >= powerUpRect.left && characterRect.left <= powerUpRect.right) {
      powerUp.parentNode.removeChild(powerUp);
      gameSpeed += 1;
    }
  });
  return collision;
}

// Handle jumping
let isJumping = false;
let jumpVelocity = 0;
const jumpHeight = 150;
const gravity = 5;

document.addEventListener('keydown', (event) => {
  if (event.code === 'ArrowUp' && !isJumping) {
    jump();
  }
});

function jump() {
  isJumping = true;
  jumpVelocity = 20;
  setInterval(fall, 20);
}

function fall() {
  jumpVelocity -= gravity;
  character.style.top = parseInt(character.style.top) - jumpVelocity + 'px';

  if (parseInt(character.style.top) >= jumpHeight) {
    character.style.top = jumpHeight + 'px';
    jumpVelocity = 0;
    isJumping = false;
  }
}
