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

    // Wind (one-time gust)
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

