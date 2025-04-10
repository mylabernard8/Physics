let colorlist = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000']

let bouncers = []
let G = 0.1
let wind
    
function setup() {
  createCanvas(400, 400);
  // bouncers.push( new Bouncer(random(width),random(height),10,random(colorlist),random(-1,1), random(-1,1)) )
  wind = random(-0.5,0.5)
  for( let i = 0; i < 10; i++ ) {
    bouncers.push( new Bouncer(random(width),random(height),10,random(colorlist),random(-1,1), random(-1,1)) )
  }
  // bouncers[0].setConstraints( 0, width/2, 0, height/2)
  // bouncers[0].width = random(bouncers[0].minX,bouncers[0].maxX)
  // bouncers[0].height = random(bouncers[0].minY,bouncers[0].maxY)
  ellipseMode(RADIUS)
}

function draw() {
  background(220);
  for( let b of bouncers ) {
    b.update()    
  }
}

// a blueprint for creating circles that move around the screen
class Bouncer { // noun
  // properties of a bouncer (adjectives)
  //   where it is (location)
  //   color
  //   positional constraints
  //   size
  //   velocity
  constructor(x,y,r,c,dx,dy) {
    this.x = x
    this.y = y
    this.r = r
    this.c = c
    this.dx = dx
    this.dy = dy
    this.minX = r
    this.maxX = width-r
    this.minY = r
    this.maxY = height-r
  }
  // behaviors of a bouncer (verbs)
  //   draw
  //   move
  setConstraints(minX,maxX,minY,maxY) {
    this.minX = minX + this.r
    this.maxX = maxX - this.r
    this.minY = minY + this.r 
    this.maxY = maxY - this.r
  }
  
  applyWind() {
    this.dx += wind
  }
  
  applyGravity() {
    this.dy += G
  }
  
  update() {
    this.applyGravity()
    this.move()
    this.draw()
  }
  
  move() {
    this.x += this.dx
    this.y += this.dy
    if( this.x < this.minX ) {
      this.x = this.minX
      this.dx *= -1
    }
    if( this.x > this.maxX ) {
      this.x = this.maxX
      this.dx *= -1
    }    
    if( this.y < this.minY ) {
      this.y = this.minY
      this.dy *= -1
    }    
    if( this.y > this.maxY ) {
      this.y = this.maxY
      this.dy *= -1
    }    
  }
  
  draw() {
    fill(this.c)
    circle(this.x,this.y,this.r)
  }
}