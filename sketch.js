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

  // Draw the liquid area
  fill(180, 220, 255, 100);
  noStroke();
  rect(0, height / 2, width, height / 2);

  for (let c of circles) {
    // Gravity
    c.applyForce(gravity);

    // Wind (one-time gust from spacebar)
    if (windForce !== 0) {
      c.applyForce(createVector(windForce, 0));
    }

    // Liquid drag if in lower half
    if (c.position.y > height / 2) {
      let drag = c.velocity.copy();
      drag.normalize();
      drag.mult(-1);
      let speedSq = c.velocity.magSq();
      let dragMagnitude = 0.01 * speedSq;
      drag.setMag(dragMagnitude);
      c.applyForce(drag);
    }

    c.update();
    c.checkEdges();
    c.display();
  }

  windForce = 0;
  checkCollisions();
}

function keyPressed() {
  if (key === ' ') {
    windForce = random(-0.5, 0.5);
  }
}

// FEATURE 1: Apply wind based on mouse dragging
function mouseDragged() {
  let wind = createVector((mouseX - pmouseX) * 0.05, 0);
  for (let c of circles) {
    c.applyForce(wind);
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
        let temp = c1.velocity.copy();
        c1.velocity = c2.velocity.copy();
        c2.velocity = temp;

        let overlap = minDist - distance;
        let correction = distVec.copy().normalize().mult(overlap / 2);
        c1.position.add(correction);
        c2.position.sub(correction);
      }
    }
  }
}

// Assuming you have this class already
class Circle {
  constructor(x, y, r, vx, vy) {
    this.position = createVector(x, y);
    this.velocity = createVector(vx, vy);
    this.acceleration = createVector(0, 0);
    this.radius = r;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  checkEdges() {
    if (this.position.x < this.radius) {
      this.position.x = this.radius;
      this.velocity.x *= -1;
    } else if (this.position.x > width - this.radius) {
      this.position.x = width - this.radius;
      this.velocity.x *= -1;
    }

    if (this.position.y < this.radius) {
      this.position.y = this.radius;
      this.velocity.y *= -1;
    } else if (this.position.y > height - this.radius) {
      this.position.y = height - this.radius;
      this.velocity.y *= -1;
    }
  }

  display() {
    fill(100, 150, 255);
    stroke(0);
    strokeWeight(1);
    ellipse(this.position.x, this.position.y, this.radius, this.radius);
  }
}

