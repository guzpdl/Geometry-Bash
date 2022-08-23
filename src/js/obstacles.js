class Obstacles{
    constructor(size, speed){
        this.x = canvas.width + size;
        this.y = 400-size
        this.size = size
        this.image = new Image()
        this.image.src = '/src/img/pincho.png'
        this.slideSpeed = speed;

        console.log(speed)

                
    }

    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
    slide(){
        this.draw()
        this.x -= this.slideSpeed; /* desplazara el obstaculo hacia la izquierda */
        
    }
}

