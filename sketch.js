let circles = [];
let gravity = 0.2;

function setup() {
  createCanvas(600, 400);
  ellipseMode(RADIUS);
  
  for (let i = 0; i < 5; i++) {
    circles.push(new Circle(
      random(50, width-50),
      random(50, height-50),
      20,
      random(-2, 2),
      random(-2, 2)
    ));
  }
}

function draw() {
  background(220);
  
  for (let c of circles) {
    c.applyGravity();
    c.move();
    c.checkEdges();
    c.display();
  }
  
  checkCollisions();
}

function checkCollisions() {
  for (let i = 0; i < circles.length; i++) {
    for (let j = i+1; j < circles.length; j++) {
      let c1 = circles[i];
      let c2 = circles[j];
      let d = dist(c1.x, c1.y, c2.x, c2.y);
      if (d < c1.r + c2.r) {
        // Basic bounce: swap dx and dy
        let tempDx = c1.dx;
        let tempDy = c1.dy;
        c1.dx = c2.dx;
        c1.dy = c2.dy;
        c2.dx = tempDx;
        c2.dy = tempDy;
      }
    }
  }
}

class Circle {
  constructor(x, y, r, dx, dy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
  }
  
  applyGravity() {
    this.dy += gravity;
  }
  
  move() {
    this.x += this.dx;
    this.y += this.dy;
  }
  
  checkEdges() {
    if (this.x - this.r < 0) {
      this.x = this.r;
      this.dx *= -1;
    }
    if (this.x + this.r > width) {
      this.x = width - this.r;
      this.dx *= -1;
    }
    if (this.y - this.r < 0) {
      this.y = this.r;
      this.dy *= -1;
    }
    if (this.y + this.r > height) {
      this.y = height - this.r;
      this.dy *= -1;
    }
  }
  
  display() {
    fill(100);
    noStroke();
    circle(this.x, this.y, this.r);
  }
}

