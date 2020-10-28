const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
var engine, world;

var divisions = [];
var particles = [];
var plinkos = [];
var divisionHeight = 300;
var score = 0;
var particle;
var turn = 0;
var gameState = "Start"

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;


  ground = new Ground(400, 780, width, 20);

  for (var k = 0; k <= width; k += 80) {
    divisions.push(new Division(k,height-divisionHeight/2,10,divisionHeight-30));
  }

  for (let j = 75; j <= width - 20; j += 50) {
    plinkos.push(new Plinko(j, 75));
  }
  for (let j = 50; j <= width - 10; j += 50) {
    plinkos.push(new Plinko(j, 175));
  }
  for (let j = 75; j <= width - 20; j += 50) {
    plinkos.push(new Plinko(j, 275));
  }
  for (let j = 50; j <= width - 10; j+=50) {
    plinkos.push(new Plinko(j, 375));
  }
 
}

function draw() {
  background(0);
  Engine.update(engine);
  mouseDragged();
  textSize(15)
  text(mouseX+","+mouseY,740,26)
  textSize(20)
  text("Score:  "+score,80,24 )

  if (gameState =="End") {
    
    textSize(100);
    text("GameOver", 150, 250);
  }

 

  for (let i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }

 
  for (let j = 0; j < particles.length; j++) {
    particles[j].display();
  }
  for (let k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }


  if(particle!=null)
    {

       particle.display();
       if (particle.body.position.y>760)
        {
      
       if (particle.body.position.x>5 && particle.body.position.x<235)
       {
         score = score+500;
         particle = null;
         if(turn>=5)
          {
             gameState = "End";
          } else if(particle.body.position.x>240 && particle.body.position.x<315)
             {
              score = score+200;
              particle = null;
              if(turn>=5)
              {
               gameState = "End";
              }
            }  else if(particle.body.position.x>245 && particle.body.position.x<555)
               {
                 score = score+200;
                 particle = null;
                 if(turn>=5)
               {
               gameState = "End";
              }
            } else if(particle.body.position.x>565 && particle.body.position.x<795)
              {
               score = score+500;
               particle = null;
               if(turn>=5)
              {
                 gameState = "End";
              }
           }
          }
   }
    

  }
  
  ground.display();

  drawSprites();
}



function mouseDragged()
{
  if(gameState!=="End")
  {
      turn++;
     particle=new Particle(mouseX, 10, 10); 
     }
}






