import { Snake } from "./snake.js";
import generateFood from "./food.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const snake = new Snake(canvas, ctx, 10, 10);

// event listener
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    snake.setVelocity(0, -1);
  } else if (event.key === "ArrowDown") {
    snake.setVelocity(0, 1);
  } else if (event.key === "ArrowLeft") {
    snake.setVelocity(-1, 0);
  } else if (event.key === "ArrowRight") {
    snake.setVelocity(1, 0);
  } else {
    gameRunning = false;
    cancelAnimationFrame(gameLoop);
  }
});

let gameRunning = true;
// create a food item
let food = generateFood(canvas);

function gameLoop() {
  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // update the snake's position
  snake.move();

  // draw the snake's body
  snake.draw(ctx);

  // check if the snake is colliding with the food
  const distance = Math.sqrt(
    Math.pow(snake.position.x - food.x, 2) +
      Math.pow(snake.position.y - food.y, 2)
  );
  if (distance < food.size) {
    // if so, remove the food from the canvas and generate a new food item
    food = generateFood(canvas);
    // grow the snake
    snake.grow();
  }

  // draw the food on the canvas
  food.draw(ctx);

  if (gameRunning) {
    // request the next animation frame
    requestAnimationFrame(gameLoop);
  }
}

// start the game loop
requestAnimationFrame(gameLoop);
