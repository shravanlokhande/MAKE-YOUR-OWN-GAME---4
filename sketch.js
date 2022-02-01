
var zombie,shooter,bg,bulletImg;
var shooterImg,shooterImg2,bgImg,zombieImg;
var heart_1,heart_2,heart_3;
var heart1Img,heart2Img,heart3Img;
var bulletGroup,zombieGroup
var gameState = "fight";
var life = 3;
var score = 0;
var bullets = 20;

function preload(){
zombieImg = loadImage('zombie.png');
shooterImg = loadImage("shooter_1.png");
bulletImg = loadImage("bullets.png")
shooterImg2 = loadImage("shooter_2.png");
bgImg = loadImage("bg.jpg");
heart1Img = loadImage('heart_1.png');
heart2Img = loadImage('heart_2.png');
heart3Img = loadImage('heart_3.png');
}

function setup() {
  createCanvas(windowWidth,windowHeight);

 // engine = Engine.create();
  //world = engine.world;

bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
bg.addImage(bgImg);
bg.scale =1.0;

  
shooter = createSprite(displayWidth-1200,displayHeight-300,50,50);
shooter.addImage(shooterImg);
shooter.scale = 0.3;

heart_1 = createSprite(displayWidth-150,50,20,20)
heart_1.addImage(heart1Img);
heart_1.scale = 0.3; 

heart_2 = createSprite(displayWidth-150,50,20,20)
heart_2.addImage(heart2Img);
heart_2.scale = 0.3 

heart_3 = createSprite(displayWidth-150,50,20,20)
heart_3.addImage(heart3Img);
heart_3.scale = 0.4

bulletGroup = new Group();

zombieGroup = new Group();
}
 

function draw() 
{
  background(51);
  //Engine.update(engine);                                                 
  
if(gameState ==="fight"){
  if(life === 3){
    heart_3.visible = true;
    heart_2.visible = false;
    heart_1.visible = false;
  }
  if(life === 2){
    heart_2.visible = true;
    heart_3.visible = false;
    heart_1.visible = false;
  }
  if(life === 1){
    heart_1.visible = true;
    heart_2.visible = false;
    heart_3.visible = false;
  }

  if(life === 0){
    gameState = "lost";
    heart_1.visible = false;
    heart_2.visible = false;
    heart_3.visible = false;
  }

  if(score === 100){
    gameState = "won";
  }

  if(keyDown('UP_ARROW')){
    shooter.y = shooter.y-20;
  }

  if(keyDown('DOWN_ARROW')){
    shooter.y = shooter.y+20;
  }

  if(keyWentDown("space")){
    bullet = createSprite(displayWidth-1150,shooter.y-30,20,10);
    bullet.addImage(bulletImg)
    bullet.velocityX = 20;
    bulletGroup.add(bullet);
    shooter.depth = bullet.depth;
    shooter.depth+=2;
    shooter.addImage(shooterImg2);
    bullets = bullets-1;
    bullet.scale=0.02;
  }

  else if(keyWentUp ("space")){
    shooter.addImage(shooterImg);
  }
  
if(zombieGroup.isTouching(bulletGroup)){
for(var i = 0;i<zombieGroup.length;i++){
if(zombieGroup[i].isTouching(bulletGroup)){
zombieGroup[i].destroy();
bulletGroup.destroyEach();
score = score+2;
}
}
}

if(zombieGroup.isTouching(shooter)){
  for(var i = 0;i<zombieGroup.length;i++){
  if(zombieGroup[i].isTouching(shooter)){
  zombieGroup[i].destroy();
  life = life-1;
  }
  }
  }


spawnZombie();

}
 drawSprites();

 textSize(20);
 fill("white");
 text("Bullets = " + bullets,displayWidth-210,displayHeight/2-250);
 text("Score = " + score,displayWidth-200,displayHeight/2-220);
 text("Lives = " + life,displayWidth-200,displayHeight/2-280);
 if(gameState === 'lost'){
   textSize(100);
   fill('red');
   text("YOU LOST",530,350);
 }

 if(score === 100){
   gameState = "won";
 }

 if(gameState === 'won'){
  textSize(100);
  fill('red');
  text("YOU WON",530,400);
}

}
function spawnZombie(){




if(frameCount%50 === 0){

  zombie = createSprite(random(500,1100),random(100,500),40,40)
  zombie.addImage(zombieImg);
  zombie.scale = 0.2;
  zombie.velocityX = -2;


  zombieGroup.add(zombie);


}
}

