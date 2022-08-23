class Background {

    constructor() {
      this.width = 1000;
      this.height = 400;
  
      this.image = new Image();
      this.image.src = "/src/img/_21_geometry-dash-backgrounds_Download-Geometry-Dash-Lite-on-PC-with-BlueStacks.jpg";
  
      this.posX = 0;
      this.posY = 0;
  
      this.velX = enemySpeed -2;
    }
  
    draw() {
        
        ctx.fillStyle = "#282828";
        ctx.fillRect(0, 400, 1000, 600);


      ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
      ctx.drawImage(this.image, this.posX + this.width, this.posY, this.width, this.height);
      this.move()
    }
  
    move() {
      if (this.posX <= -this.width) {
        this.posX = 0;
      }
      this.posX -= this.velX;
    }
  }



