let circles = [];
let gravity = 0.2;

function setup() {
  createCanvas(600, 400);
  ellipseMode(RADIUS);
  
  circles.push(new Circle(300, 200, 20, 2, 0));
}

function draw() {
  background(220);
  
  for (let c of circles) {
    c.applyGravity();
    c.move();
    c.display();
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
  
  display() {
    fill(100);
    noStroke();
    circle(this.x, this.y, this.r);
  }
}

