function setup() {

  let cnv = createCanvas(800, 450);
  cnv.position(550, 140);  
    background(0);
  }
  
function draw() {
    
  background(0);
  fill(255);
  
  if (typeof PRODUCTS !== 'undefined')
    if (PRODUCTS.length !== 0)
    for (let i = 0; i < PRODUCTS.length; i++)   
    {
      let posx = map(i,0,PRODUCTS.length,10,800);
      
      rect(posx,350,20,-5*PRODUCTS[i].quantity);
      textSize(18);
      text("ID:" + PRODUCTS[i].id,posx,370);
      text(PRODUCTS[i].name,posx,395);
      text(PRODUCTS[i].quantity,posx,420);
    }
  
  }
  