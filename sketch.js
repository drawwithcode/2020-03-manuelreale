let productSans;
let productSansBold;
let ospiti=0;
let ospiti2=0;
var frame;

let people = [];
let face = [];


function preload(){
  productSans = loadFont('./assets/Product Sans Regular.ttf');
  productSansBold = loadFont('./assets/Product Sans Bold.ttf');

  data = loadJSON("./assets/people.json");

  for (var m=1; m<=12; m++) {face[m] = loadImage("./assets/faces/p" + m + ".png");}
}

function setup() {


for (let i = 0; i < data.people.length; i++) {
  addPeople(
    random(windowWidth),
    random(windowHeight),
    data.people[i].score,
    data.people[i].title,
    data.people[i].name,
    data.people[i].face,
    (i+1)
  );
}



}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



let u=1;

function draw() {



  u=1;

  let tot=0;
  for (let i = 0; i < people.length; i++) {
      people[i].rank=(i+1)
      tot+=people[i].score
      if(people[i].face==floor(random(0,13))&&frameCount%floor(random(20,200))==0){
        people[i].score+=floor(random(0,15))
          ospiti+=1;
          ospiti2+=floor(random(0,1.1));
      }

  }

  background('white')
  noStroke()
  createCanvas(windowWidth, windowHeight)
  for(let i = 0; i < people.length; i++) {
    people[i].run(i);
  }
  textFont(productSans);
  fill('#6387BA')
  textSize(25.65*u);
  textAlign(CENTER)
  text("Keep dragging over them to make new friends \n your friends will follow you",windowWidth/2,windowHeight/6)
}



function addPeople(x, y, size, title, name, face, rank) {
  let bubbleColor = "white";
  const aNewBubble = new Bubble(x, y, size, bubbleColor, name, face, rank)
  people.push(aNewBubble);
}

class Bubble {
  constructor(temp_x,temp_y,temp_r,temp_color,temp_name,temp_face, temp_rank) {
    this.x=temp_x;
    this.y=temp_y;
    this.name = temp_name;
    this.score = temp_r;
    this.face = temp_face;
    this.flag=0;
    this.speedx=0;
    this.speedy=0;

  }


  display() {

    if(this.flag==0){
    push();
    rectMode(CENTER)
    imageMode(CENTER)
    stroke(51,102,255,76.5);
    strokeWeight(3.5*u);
    fill('white');
    rect(this.x,this.y, 70*u,60*u, 15*u);
    image(face[this.face], this.x, this.y, 121*0.42*u, 91*0.45*u );
    pop();
  }else{
  push();
  rectMode(CENTER)
  imageMode(CENTER)
  stroke(51,102,255,255);
  strokeWeight(3.5*u);
  fill('white');
  rect(this.x,this.y, 70*u,60*u, 15*u);
  noStroke();
  textFont(productSansBold);
  fill('#6387BA')
  textSize(16.65*u);
  textAlign(CENTER)
  text(this.name, this.x, this.y+50*u);
  image(face[this.face], this.x, this.y, 121*0.42*u, 91*0.45*u );
  pop();
}
  }


check(){
  if(this.flag !=1){
    if (mouseIsPressed){
      if (dist(mouseX,this.x,mouseY,this.y)<100){
    this.flag=1;
  }
}
}
}



  updatePosition(z) {


  let  o=z;

if(this.x+35*u>windowWidth){
  this.x=windowWidth-40*u
  this.speedx=-this.speedx
}

if(this.y+30*u>windowHeight){
  this.y=windowHeight-35*u
  this.speedy=-this.speedy
}

if(this.y-30*u<0){
  this.y=0+35*u
  this.speedy=-this.speedy
}

if(this.x-35*u<0){
  this.x=0+40*u
  this.speedx=-this.speedx
}

// this.speedx = map(this.speedx,-100,100,-10,10)
// this.speedy = map(this.speedy,-100,100,-10,10)
 this.speedx=this.speedx*0.99
 this.speedy=this.speedy*0.99

 if(this.speedx>50||this.speedx<-50){
   this.speedx=this.speedx*0.8
 }

 if(this.speedy>50||this.speedy<-50){
   this.speedy=this.speedy*0.8
 }
if(this.flag==0){
 if(mouseX>this.x) (this.speedx-=0.1*dist(this.x,0,mouseX,0)*map(dist(this.x,this.y,mouseX,mouseY),0,400,0.1,0,true))
 if(mouseX<this.x) (this.speedx+=0.1*dist(this.x,0,mouseX,0)*map(dist(this.x,this.y,mouseX,mouseY),0,400,0.1,0,true))

 if(mouseY>this.y) (this.speedy-=0.1*dist(0,this.y,0,mouseY)*map(dist(this.x,this.y,mouseX,mouseY),0,400,0.1,0,true))
 if(mouseY<this.y) (this.speedy+=0.1*dist(0,this.y,0,mouseY)*map(dist(this.x,this.y,mouseX,mouseY),0,400,0.1,0,true))
}else{
  if(mouseX>this.x) (this.speedx+=0.1*dist(this.x,0,mouseX,0)*map(dist(this.x,this.y,mouseX,mouseY),0,900,0.1,0,true))
  if(mouseX<this.x) (this.speedx-=0.1*dist(this.x,0,mouseX,0)*map(dist(this.x,this.y,mouseX,mouseY),0,900,0.1,0,true))

  if(mouseY>this.y) (this.speedy+=0.1*dist(0,this.y,0,mouseY)*map(dist(this.x,this.y,mouseX,mouseY),0,900,0.1,0,true))
  if(mouseY<this.y) (this.speedy-=0.1*dist(0,this.y,0,mouseY)*map(dist(this.x,this.y,mouseX,mouseY),0,900,0.1,0,true))
}

    this.x=lerp(this.x, this.x+this.speedx, 0.6);
    this.y=lerp(this.y, this.y+this.speedy, 0.6);

    for(let i = 0; i < people.length; i++) {
      if(i!=o){

        if(people[i].x>this.x) (this.speedx-=0.1*dist(this.x,0,people[i].x,0)*map(dist(this.x,this.y,people[i].x,people[i].y),0,100,2,0,true))
        if(people[i].x<this.x) (this.speedx+=0.1*dist(this.x,0,people[i].x,0)*map(dist(this.x,this.y,people[i].x,people[i].y),0,100,2,0,true))

        if(people[i].y>this.y) (this.speedy-=0.1*dist(0,this.y,0,people[i].y)*map(dist(this.x,this.y,people[i].x,people[i].y),0,100,2,0,true))
        if(people[i].y<this.y) (this.speedy+=0.1*dist(0,this.y,0,people[i].y)*map(dist(this.x,this.y,people[i].x,people[i].y),0,100,2,0,true))

    }
    }

     this.x=lerp(this.x, windowWidth/2, 0.001);
     this.y=lerp(this.y, windowHeight/2, 0.001);

  }



  run(i) {
    this.check(i)
    this.updatePosition(i);
    this.display(i);
  }
}
