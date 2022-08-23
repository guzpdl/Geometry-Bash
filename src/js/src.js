const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let presetTime = 1000/* tiempo promedio para que se genere un nuevo obstaculo */
let enemySpeed = 5 /* velocidad inicial del obstaculo*/
let score = 0

let background = new Background();
let player = new Char(150, 350, 50); /* 350 porque el personaje  tiene 50pixeles  adentro y el tamaño del canvas es 400 */
let arrayBlocks = [];
let platformArray = [];

let scoreIncrement= 0 /* si score es multiplo de 10, aumentará la dificultad */
let canScore = true
let animationId = null


// dibuja una linea sobre el bg  la cual el char y los objetos tomarán como referencia para su spawn
function drawBackgroundLine() {
    ctx.beginPath()
    ctx.moveTo(0,400)
    ctx.lineTo(1000,400)
    ctx.lineWidth = 1.9
    ctx.strokeStyle = "black"
    ctx.stroke()
}

// ----------------- Random number generator for Obstacles ------------------

function getRandomNumber(min, max){
    return Math.floor(Math.random()*(max-min+1))+min
}

// genera obstaculos repetidamente en un intervalo aleatorio (se pueden modificar los valores)
function randomNumberInterval(timeInterval){
    let returnTime = timeInterval

    return (Math.random() - 0.5) ?  returnTime += getRandomNumber(presetTime/3, presetTime*1.5) : returnTime -= getRandomNumber(presetTime/5, presetTime/2);
    
}


// ------------------- Obstacles Generator ---------------------

// cuando se llame a esta funcion se empujará un nuevo obstaculo a la matriz 
function generateObstacles (){
    let delay = randomNumberInterval(presetTime)
    arrayBlocks.push(new Obstacles(50, enemySpeed))
    setTimeout(generateObstacles, delay)

}

// ------------------------- Incremento velocity obstaculos ----------------
function speedIncrease(){
    if(scoreIncrement +10 === score){
        scoreIncrement = score
        enemySpeed++
        presetTime >= 100 ? presetTime -= 100 : presetTime = presetTime/2
        // incrementa la velocidad de los bloques
        arrayBlocks.forEach(block => {
            block.slideSpeed = enemySpeed
        })
    }
}

function drawScore () {
    ctx.font = "80 px Arial"
    ctx.fillStyle = "black"
    let scoreString = score.toString()
    let xOffset = ((scoreString.length - 1) * 20)
    ctx.fillText(scoreString, 280 - xOffset, 100)
}


function playerCollision(player,block){
    let s1 = Object.assign(Object.create(Object.getPrototypeOf(player)), player);
    let s2 = Object.assign(Object.create(Object.getPrototypeOf(block)), block);
    
    s2.size = s2.size -10;
    s2.x = s2.x +15;
    s2.y = s2.y +15;
    return !(
        s1.x>s2.x+s2.size ||
        s1.x+s1.size<s2.x || 
        s1.y>s2.y+s2.size || 
        s1.y+s1.size<s2.y 
    )
}

function isPastBlock(player, block){
    return(
        player.x + (player.size / 2) > block.x + (block.size / 4) && 
        player.x + (player.size / 2) < block.x + (block.size / 4) * 3
    )
}


// invocará al canvas en cada frame para crear la ilusion de movimineto
function animation (){
    animationId = requestAnimationFrame(animation)
    ctx.clearRect(0,0,canvas.width,canvas.height) /* borrará el canvas del frame anterior*/

    drawBackgroundLine()
    background.draw()
    drawScore()

    player.draw()

    speedIncrease()

    collisionDetector()

    platformArray.forEach(platArr =>{
        platArr.slide()
    })
    // 

    // if (player.y + player.x + player.size <= platform.positon.y && player.y + player.x + player.size >= platform.positon.y && player.x+player.y + player.size >= platform.position.x && player.x <= platform.position.x + platform.width){
    //        this.shouldJump = false
    //     }
}

animation()
setTimeout(() => {
    generateObstacles()
}, randomNumberInterval(presetTime))

setTimeout(() => {
    generatePlatforms()
}, randomNumberInterval(presetTime))


// el personaje saltara cuando el usuario presione las teclas descritas y cambiará el valor de 'shouldJump' a true para activar la animacion
addEventListener("keydown", ({code}) => {
    console.log(code)
    if(code === "Space" || code === "ArrowUp" || code === "KeyW" || code === "click"){
        if(!player.shouldJump){
            player.jumpCounter = 0
            player.shouldJump = true
            canScore  = true
        }
    }
})

function collisionDetector(){

    arrayBlocks.forEach((arrayBlock, index )=> {
        arrayBlock.slide()
    
            if (playerCollision(player, arrayBlock)){
                cancelAnimationFrame(animationId)
            }
    
            if(isPastBlock(player, arrayBlock) && canScore){
                canScore = false
                score++  
            }
             
            if((arrayBlock.x + arrayBlock.size) <= 0){
                setTimeout(() => {
                    arrayBlocks.splice(index, 1)
                }, 0)
            }
        })
}


function generatePlatforms(){
    let delay = randomNumberInterval(presetTime)
    platformArray.push(new Platform(enemySpeed))
    setTimeout(generatePlatforms, delay)
}


