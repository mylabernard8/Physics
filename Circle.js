class Circle {
  constructor(x, y, r, vx, vy, m = 1) {
    this.position = createVector(x, y);
    this.velocity = createVector(vx, vy);
    this.acceleration = createVector(0, 0);
    this.radius = r;
    this.mass = m;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
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
      this.velocity.y *= -0.9;
    }
  }

  display() {
    fill(100);
    noStroke();
    circle(this.position.x, this.position.y, this.radius * 2);
  }
}


