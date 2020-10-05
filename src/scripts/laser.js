class Laser {
    constructor(idNumber, xPosition, yPosition, rotation){
        this.laserId = `laser-${idNumber}`;
        this.gameArea = document.querySelector('.game-area');
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.rotation = rotation;
        this.velocity = 3;
        this.hit = false;
    }
    init(){
        // create the laser element
        const laser = document.createElement('img');
        laser.src = './dist/assets/images/laser-green.svg';
        laser.classList.add('laser');
        laser.setAttribute('id', `${this.laserId}`);
        this.gameArea.appendChild(laser);

        // position laser at gun position
        this.xPosition += - laser.width/2;
        laser.style.left = this.xPosition;
        laser.style.bottom = this.yPosition;
        laser.style.transform = `rotate(${this.rotation}rad)`;

        // create sound for meteor
        const sound = document.createElement("audio");
        sound.src = './dist/assets/sounds/weapon_player.mp3';
        sound.setAttribute("preload", "auto");
        sound.setAttribute("controls", "none");
        sound.style.display = "none";
        this.gameArea.appendChild(sound);
        sound.play();

        this.moveLaser(laser, sound);
    }
    moveLaser(laser, sound){
        const laserInterval = setInterval(() => {

            this.xPosition += this.velocity*Math.sin(this.rotation);
            this.yPosition += this.velocity*Math.cos(this.rotation);

            // check if laser goes out of bounds and remove, else update position
            if(this.hit){
                laser.remove();
                sound.remove();
                clearInterval(laserInterval);
            } else {
                //update css positions
                laser.style.left = this.xPosition;
                laser.style.bottom = this.yPosition;
            }
        }, 10);
    }
}

export {Laser as default};