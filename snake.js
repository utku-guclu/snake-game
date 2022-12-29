import { LinkedList } from "./linkedList.js";

export class Snake {
  constructor(canvas, ctx, x, y) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.position = { x: 60, y: 60 };
    this.velocity = { x: 1, y: 0 };
    this.size = 10;
    this.body = new LinkedList();
    this.body.addToTail(this.position);
    this.tail = {
      x: x,
      y: y,
      next: null,
    };
  }

  draw(ctx) {
    ctx.fillStyle = "green";
    // draw the head of the snake
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size / 2);

    // check if the head is defined
    if (this.head) {
      // draw the rest of the snake using the linked list
      let current = this.head.next;
      while (current) {
        ctx.fillRect(current.x, current.y, this.size, this.size / 2);
        current = current.next;
      }
    }
  }

  move() {
    // update the snake's position based on its velocity
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // teleport the snake to the opposite side of the canvas if it goes outside the bounds
    if (this.position.x < 0) {
      this.position.x = this.canvas.width - this.size;
    } else if (this.position.x + this.size > this.canvas.width) {
      this.position.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = this.canvas.height - this.size;
    } else if (this.position.y + this.size > this.canvas.height) {
      this.position.y = 0;
    }

    //snake movement
    // add the new position to the tail of the linked list
    this.body.addToTail(this.position);

    // remove the head of the linked list if the snake has not grown
    if (this.body.length > this.size) {
      this.body.removeHead();
    }
  }

  grow() {
    // check if the tail is defined
    if (this.tail) {
      // add a new node to the end of the list
      const newTail = {
        x: this.tail.x,
        y: this.tail.y,
        next: null,
      };
      this.tail.next = newTail;
      this.tail = newTail;
    } else {
      // initialize the tail if it has not been initialized yet
      this.tail = newHead;
    }
  }

  setVelocity(x, y) {
    // set the snake's velocity
    this.velocity.x = x;
    this.velocity.y = y;
  }
}
