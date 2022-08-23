class Platform extends Obstacles{
    constructor(speed){
        super(speed)    
        this.position = {
            x: 1000,
            y: 275
        }
        this.width = 200;
        this.height = 20;
        this.slideSpeed = speed;

        this.image2 = new Image();
        this.image2.src = '/src/img/pngwing.com.png'

        console.log(speed)
    }
    
    draw(){
        ctx.drawImage(this.image2, this.position.x, this.position.y, this.width, this.height);
    }

    slide(){
        this.draw()
        this.position.x -= this.slideSpeed; /* desplazara el obstaculo hacia la izquierda */
    }
}
