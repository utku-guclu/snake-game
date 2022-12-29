// Food
class Food {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.generate();
  }

  generate() {
    // Generate a random position for the food
    this.position = [
      Math.floor(Math.random() * this.gridSize),
      Math.floor(Math.random() * this.gridSize),
    ];
  }
}

// Snake
//  -- queue for smake body (array)
//  -- draw - draw grid with the sankes body
//  -- move - take in a direction, manipulate queue
class Snake {
  constructor() {
    this.snakeBody = [
      [5, 1],
      [5, 2],
      [5, 3],
    ];
    this.gridSize = 10;
    this.direction = "right";
    this.speed = 500;
    this.score = 0;
    this.food = new Food(this.gridSize);
  }

  move(direction) {
    const delta = {
      up: [-1, 0],
      down: [1, 0],
      left: [0, -1],
      right: [0, 1],
    };

    const currentHead = this.snakeBody[this.snakeBody.length - 1];
    const [currRow, currCol] = currentHead;
    const [changeRow, changeCol] = delta[direction];
    const newHead = [currRow + changeRow, currCol + changeCol];

    const [foodRow, foodCol] = this.food.position;
    const [headRow, headCol] = newHead;

    if (foodRow === headRow && foodCol === headCol) {
      // Snake ate the food, do not remove the last segment
      this.food.generate();
      this.score += 1;
      this.speed -= 50;
    } else {
      // Remove the last segment
      this.snakeBody.shift();
    }
    // Update the snake's position
    this.snakeBody.push(newHead);
  }

  draw() {
    // Clear the screen
    process.stdout.write("\x1Bc");

    const grid = [];
    for (let i = 0; i < this.gridSize; i++) {
      const row = [];
      for (let j = 0; j < this.gridSize; j++) {
        row.push(" ");
      }
      grid.push(row);
    }

    this.snakeBody.forEach((pos) => {
      const [row, col] = pos;
      grid[row][col] = "O";
    });
    const currentHead = this.snakeBody[this.snakeBody.length - 1];
    const [headRow, headCol] = currentHead;
    grid[headRow][headCol] = "Ö";

    // Draw the food on the grid
    const [foodRow, foodCol] = this.food.position;
    grid[foodRow][foodCol] = "X";
    // Draw the grid
    console.log("+" + "-".repeat(this.gridSize) + "+");
    grid.forEach((row) => console.log("|" + row.join("") + "|"));
    console.log("+" + "-".repeat(this.gridSize) + "+");
  }

  gameOver() {
    // Get the current position of the snake's head
    const [row, col] = this.snakeBody[this.snakeBody.length - 1];
    // Check if the snake's head is out of bounds
    if (row < 0 || row >= this.gridSize || col < 0 || col >= this.gridSize) {
      return true;
    }
    // Check if the snake's head overlaps with any other segment of the snake
    for (let i = 0; i < this.snakeBody.length - 1; i++) {
      const [segmentRow, segmentCol] = this.snakeBody[i];
      if (row === segmentRow && col === segmentCol) {
        return true;
      }
    }
    return false;
  }

  play() {
    const stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    stdin.on("data", (keypress) => {
      // Update the direction of the snake
      if (keypress === "w") this.direction = "up";
      if (keypress === "s") this.direction = "down";
      if (keypress === "a") this.direction = "left";
      if (keypress === "d") this.direction = "right";
      if (keypress === "\u0003") process.exit();
    });

    // initialize the food
    this.food.generate();

    let delay = this.speed; // Use a separate variable to store the interval time

    // Start the game loop
    const gameLoop = setInterval(() => {
      // Update the interval time if the snake has eaten the food

      // move the snake
      this.move(this.direction);

      // Check if the game is over
      if (this.gameOver()) {
        // Clear the game loop
        clearInterval(gameLoop);
        // Display a game over message
        console.log("Game over!");
        return;
      }

      this.draw();

      // Draw score
      console.log(`Score: ${this.score}`);
    }, delay);
  }
}

const game = new Snake();
game.play();
