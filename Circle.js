class Circle {
  constructor(x, y, r, vx, vy) {
    this.position = createVector(x, y);
    this.velocity = createVector(vx, vy);
    this.radius = r;
  }

  move() {
    this.position.add(this.velocity);
  }

  checkEdges() {
    if (this.position.x - this.radius < 0) {
      this.position.x = this.radius;
      this.velocity.x *= -1;
    }
    if (this.position.x + this.radius > width) {
      this.position.x = width - this.radius;
      this.velocity.x *= -1;
    }
    if (this.position.y - this.radius < 0) {
      this.position.y = this.radius;
      this.velocity.y *= -1;
    }
    if (this.position.y + this.radius > height) {
      this.position.y = height - this.radius;
      this.velocity.y *= -1;
    }
  }

  display() {
    fill(100);
    noStroke();
    circle(this.position.x, this.position.y, this.radius * 2);
  }
}

