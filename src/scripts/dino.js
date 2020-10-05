class Dino {
    constructor(dinoObj, dinoId){
        this.dinoId = `dino-${dinoId}`;
        this.source = dinoObj.src;
        this.gameArea = document.querySelector('.game-area');
        this.xPosition = Math.random()*(window.innerWidth - 200);
        this.yPosition = 0;
        this.facingDirection = Math.round(Math.random())*Math.PI;
        this.walkSpeed = Math.random()*2;
        this.jumpInterval = Math.round(Math.random()*(100-35)+35);
        this.jumpCounter = 0;
        this.hit = false;
    }
    init(){
        // create the laser element
        const dino = document.createElement('img');
        dino.src = this.source;
        dino.classList.add('dino');
        dino.setAttribute('id', `${this.dinoId}`);
        this.gameArea.appendChild(dino);

        // create random starting position
        dino.style.left = this.xPosition;
        dino.style.transform = `rotateY(${this.facingDirection}rad)`;

        // check if dino is static
        if(this.walkSpeed === 0){
            this.walkSpeed = 0.1;
        }

        // move dino
        this.moveDino(dino);
    }
    moveDino(dino){

        const dinoInterval = setInterval(() => {

            if(this.hit){
                clearInterval(dinoInterval);
            }

            // x-direction walk & facing
            if(this.facingDirection === 0 && this.xPosition < window.innerWidth - 200){
                this.xPosition += this.walkSpeed;
                dino.style.left = this.xPosition;
            } else if(this.facingDirection === 0 && this.xPosition >= window.innerWidth - 200){
                this.facingDirection = Math.PI;
                dino.style.transform = `rotateY(${this.facingDirection}rad)`;
            } else if(this.facingDirection === Math.PI && this.xPosition > 0) {
                this.xPosition -= this.walkSpeed;
                dino.style.left = this.xPosition;
            } else if(this.facingDirection === Math.PI && this.xPosition <= 0){
                this.facingDirection = 0;
                dino.style.transform = `rotateY(${this.facingDirection}rad)`;
            }

            // animate a jump
            if(this.jumpCounter === this.jumpInterval-1){
                this.yPosition += 10;
                dino.style.bottom = this.yPosition;
                this.jumpCounter ++
            } else if(this.jumpCounter === this.jumpInterval){
                this.yPosition += -10;
                dino.style.bottom = this.yPosition;
                this.jumpCounter = 0;
            } else if (this.jumpCounter > this.jumpInterval){
                this.jumpCounter = 0;
            } else {
                this.jumpCounter ++;
            }
            
        }, 50);
    }
    flyDino(dino){

        let rotation = 0;

        // select random rotation
        if(Math.round(Math.random()) === 1){
            rotation = (Math.random()*(75*(Math.PI/180)))+(45*(Math.PI/180));
        } else {
            rotation = (Math.random()*(315*(Math.PI/180)))+(285*(Math.PI/180));
        }
        
        // rotation = 315*(Math.PI/180);
        const spinV = 0.05;
        let spin = 0;
        this.velocity = 20;
        this.facingDirection = 0;

        const flyInterval = setInterval(() => {

            // update dino position
            this.yPosition += this.velocity*Math.cos(rotation);
            this.xPosition += this.velocity*Math.sin(rotation);

            spin += spinV;

            // check if dino goes out of bounds and remove, else update position
            if(this.xPosition < 0 || this.xPosition > window.innerWidth || this.yPosition > window.innerHeight){
                dino.remove();
                clearInterval(flyInterval);
            } else {
                //update css positions
                dino.style.left = this.xPosition;
                dino.style.bottom = this.yPosition;
                dino.style.transform = `rotate(${spin}rad)`
            }

        }, 50);
    }
}

export {Dino as default};