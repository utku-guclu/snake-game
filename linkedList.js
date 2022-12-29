export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  addToTail(value) {
    // create an object with a single "value" property
    const newTail = { value };
    if (this.length === 0) {
      this.head = newTail;
      this.tail = newTail;
    } else {
      this.tail.next = newTail;
      this.tail = newTail;
    }
    this.length++;
  }

  removeHead() {
    if (this.length === 0) return;
    const oldHead = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead.next;
    }
    this.length--;
    return oldHead.value;
  }
}
