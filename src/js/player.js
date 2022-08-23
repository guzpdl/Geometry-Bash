class Char {
    constructor(x,y,size){
       this.x=x
       this.y=y
       this.size=size


       this.image = new Image()
       this.image.src = '/src/img/geometry-dash-icon-download-3.jpg'
       //  Jump config
       this.jumpHeight = 15
       this.shouldJump = false
       this.jumpCounter = 0
       // SQ rotation & Spin
       // set initial value to be zero = no rotation
       this.spin = 0
       // square rotate 360 º in 32 frames
       this.spinIncrement = 360/32
   }

   rotation(){
    // almacenar los puntos centrales  de x e y 
    let offsetXPosition = this.x + (this.size/2)
    let offsetYPosition = this.y + (this.size/2)
    ctx.translate(offsetXPosition,offsetYPosition)/* mueve canvas al centro del personaje*/
    ctx.rotate(this.spin * Math.PI / 180) /* cuando el personaje se atraiga a la linea, volverá a su estado rotado*/
    ctx.rotate(this.spinIncrement * Math.PI / 180)
    ctx.translate(-offsetXPosition,-offsetYPosition) /* devuelve canvas a su posicion inicial*/
    this.spin += this.spinIncrement /* incrementar giro segun valores almacenados en spinIncrement */
    
    /* convertir a radianes -> **ver tutorial** : https://www.youtube.com/watch?v=-skqrNO0UCs */
 }

    //  desrotacion 
    counterRotation(){
        let offsetXPosition = this.x + (this.size/2)
        let offsetYPosition = this.y + (this.size/2)
        ctx.translate(offsetXPosition,offsetYPosition)
        ctx.rotate(-this.spin * Math.PI / 180) /* rotará hacia atrás por el valor que tenga el giro actual*/
        ctx.translate(-offsetXPosition,-offsetYPosition)
     }

     jump(){
        if(this.shouldJump){
            this.jumpCounter++

                // 14 frames para el salto hacia arriba
            if(this.jumpCounter < 15){
                this.y -= this.jumpHeight
            } 
            // 4 frames de suspension
            else if (this.jumpCounter > 14 && this.jumpCounter < 19){
                this.y += 0
            }
            // 14 frames para volver a la linea
            else if (this.jumpCounter < 33){
                this.y += this.jumpHeight
            }
            this.rotation() /* llama a la funcion para que gire mientras está en el salto */

            // el ciclo acabará cuando llegue a los 32 frames
            if (this.jumpCounter >= 32){
                this.counterRotation()
                this.spin = 0 /* reestablece la rotacion para que haya un nuevo salto */
                this.shouldJump = false
            }
        }
     }

     draw(){
        this.jump ()
        ctx.drawImage(this.image, this.x, this.y, this.size, this.size) 
        // reset rotation - la rotación de otros elementos no se ejecutan
        if(this.shouldJump) this.counterRotation()
     }
}
