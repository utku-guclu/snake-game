class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.size, this.size / 2);
  }
}

// generate food
export default function generateFood(canvas) {
  const x = Math.floor((Math.random() * canvas.width) / 10) * 10;
  const y = Math.floor((Math.random() * canvas.height) / 10) * 10;
  return new Food(x, y);
}
