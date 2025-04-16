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
      random(-2, 2),
      random(0.5, 2) // mass
    ));
  }
}

function draw() {
  background(220);
  
  for (let c of circles) {
    c.applyForce(gravity);
    if (windForce !== 0) {
      c.applyForce(createVector(windForce, 0));
    }
    c.update();
    c.checkEdges();
    c.display();
  }

  windForce = 0; // one-time gust
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
      let d = p5.Vector.dist(c1.position, c2.position);
      if (d < c1.radius + c2.radius) {
        // Swap velocities for now
        let temp = c1.velocity.copy();
        c1.velocity = c2.velocity.copy();
        c2.velocity = temp;
      }
    }
  }
}


