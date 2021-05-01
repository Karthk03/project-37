var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstical,obstical_img = [],obsticalGroup;
var rand,score,gameState,highScore;
var cloud,cloud_img,cloudGroup;
var gameOver,restart,gameOver_img,restart_img;
var highScore;

function preload()
{
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  
  for(let obsticalArrPos=1;obsticalArrPos<=6;obsticalArrPos++)
    {
      obstical_img[obsticalArrPos] = loadImage("obstacle" + obsticalArrPos + ".png")
    }
  
  cloud_img = loadImage("cloud.png");
  
  gameOver_img = loadImage("gameOver.png");
  restart_img = loadImage("restart.png");
}

function setup() 
{
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  restart= createSprite(300,100,0,0);
  restart.addImage(restart_img);
  restart.scale = 0.5;
  restart.visible = false;
  
  gameOver = createSprite(300,50,0,0);
  gameOver.addImage(gameOver_img);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  obsticalGroup = new Group();
  cloudGroup = new Group();
  
  score = 0;
  gameState = "playing";
  highScore = 0;
}

function draw() 
{
  background(100);
  
  gameOver.x = trex.x+200;
  restart.x = trex.x + 200;
  
  if(gameState == "playing")
  {
    trex.velocityX = 10;
    invisibleGround.velocityX = 10;
    camera.x = trex.x+250; 
    
    if(keyDown("space")&& trex.collide(invisibleGround)) 
    {
      trex.velocityY = -15;
    }

    trex.velocityY = trex.velocityY + 0.8

    if (trex.x - ground.x >=800)
    {
      ground.x = trex.x;
    }

    if(frameCount%20 == 0)
    {
      score++;
    }
    cloudSpawner();
    obsticalSpawner();
    
    if(trex.isTouching(obsticalGroup))
    {
      gameState = "end"
    }
  }
  else
  {
    
    gameOver.visible = true;
    restart.visible = true;
    
    trex.setVelocity(0,0);
    
    obsticalGroup.setVelocityXEach(0);
    
    cloudGroup.setVelocityXEach(0);
    cloudGroup.setLifetimeEach(-1);
    
    ground.velocityX=0;
    
    trex.changeAnimation("collided");
    
    reStart();
    
    if(score>=highScore)
      {
        highScore = score;
      }
  }
  
  fill("white");
  textSize(15);
  text("Score: "+score,trex.x+400,20)
  
  fill("white");
  textSize(15);
  text("HI: "+highScore,trex.x+350,20)

  trex.collide(invisibleGround);
  drawSprites();
}

function obsticalSpawner()
{
  if(frameCount%50 == 0)
  {
    obstical = createSprite(trex.x+500,150,0,0);
    rand = Math.round(random(1,6))
    switch(rand)
      {
        case 1:obstical.addImage(obstical_img[1])
          break;
        case 2:obstical.addImage(obstical_img[2])
          break;
        case 3:obstical.addImage(obstical_img[3])
          break;
        case 4:obstical.addImage(obstical_img[4])
          break;
        case 5:obstical.addImage(obstical_img[5])
          break;
        case 6:obstical.addImage(obstical_img[6])
          break;
        default:
          break;
      }
    obstical.scale = 0.5
    obsticalGroup.add(obstical);
  }
}


function cloudSpawner()
{
  if(frameCount%45 == 0)
  {
    cloud = createSprite(trex.x+500,Math.round(random(20,100),0,0))
    cloud.addImage(cloud_img);
    cloud.velocityX = -5;
    cloud.scale = 0.75;
    cloud.lifetime = 140;
    cloudGroup.add(cloud);
    trex.depth = cloud.depth++;
  }
}

function reStart()
{
  if(mousePressedOver(restart))
    {
      gameState = "playing";
      trex.changeAnimation("running");
      obsticalGroup.destroyEach();
      cloudGroup.destroyEach();
      ground.velocityX = -5;
      invisibleGround.x = trex.x-200
      score = 0;
      gameOver.visible = false;
      restart.visible = false;
    }
}