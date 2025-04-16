let circles = [];
let gravity;
let windForce = 0;

function setup() {
  createCanvas(600, 400);
  ellipseMode(RADIUS);
  gravity = createVector(0, 0.2);

  for (let i = 0; i < 5; i++) {
    circles.push(new Circle(
      random(50, width - 50),
      random(50, height - 50),
      20,
      random(-2, 2),
      random(-2, 2)
    ));
  }
}

function draw() {
  background(220);

  for (let c of circles) {
    c.applyForce(gravity);

    // Apply wind only when triggered
    if (windForce !== 0) {
      c.applyForce(createVector(windForce, 0));
    }

    c.update();
    c.checkEdges();
    c.display();
  }

  windForce = 0; // Reset wind force after it's applied once
  checkCollisions();
}

function keyPressed() {
  if (key === ' ') {
    windForce = random(-0.5, 0.5);
  }
}

function checkCollisions() {
  for (let i = 0; i < circles.length; i++) {
    for (let j = i + 1; j < circles.length; j++) {
      let c1 = circles[i];
      let c2 = circles[j];

      let distVec = p5.Vector.sub(c1.position, c2.position);
      let distance = distVec.mag();
      let minDist = c1.radius + c2.radius;

      if (distance < minDist) {
        // Simple elastic collision: swap velocities
        let temp = c1.velocity.copy();
        c1.velocity = c2.velocity.copy();
        c2.velocity = temp;

        // Push them apart to avoid sticking
        let overlap = minDist - distance;
        let correction = distVec.copy().normalize().mult(overlap / 2);
        c1.position.add(correction);
        c2.position.sub(correction);
      }
    }
  }
}

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
    this.acceleration.mult(0); // Reset acceleration
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
      this.velocity.y *= -0.9; // damping
    }
  }

  display() {
    fill(100);
    noStroke();
    circle(this.position.x, this.position.y, this.radius * 2);
  }
}

