let circles = [];

function setup() {
  createCanvas(600, 400);
  ellipseMode(RADIUS);
  
  circles.push(new Circle(300, 200, 20, 2, 3)); // starting example
}

function draw() {
  background(220);
  
  for (let c of circles) {
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
