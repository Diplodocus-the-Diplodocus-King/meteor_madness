class Powerup {
    constructor(idNumber){
        this.powerupId = `powerup-${idNumber}`;
        this.gameArea = document.querySelector('.game-area');
        this.xPosition = Math.round(Math.random()*((window.innerWidth-100)-100) + 100);
        this.yPosition = Math.round(Math.random()*((window.innerHeight-100)-100) + 100);
        this.powerupType = Math.round(Math.random()*2);
        this.hit = false;
    }
    init(){
        // create the powerup element
        const powerup = document.createElement('img');

        // apply image dependant on type
        switch(this.powerupType){
            case 0:
                powerup.src = './dist/assets/images/powerups/energy.svg';
                break;
            case 1:
                powerup.src = './dist/assets/images/powerups/fire.svg';
                break;
            case 2:
                powerup.src = './dist/assets/images/powerups/bullet.svg';
        }

        // apply class and id then append to game area
        powerup.classList.add('powerup');
        powerup.setAttribute('id', `${this.powerupId}`);
        this.gameArea.appendChild(powerup);

        // position laser at gun position
        powerup.style.left = this.xPosition;
        powerup.style.bottom = this.yPosition;

        // create sound for meteor
        const sound = document.createElement("audio");
        sound.src = './dist/assets/sounds/explosion_powerup.mp3';
        sound.setAttribute("preload", "auto");
        sound.setAttribute("controls", "none");
        sound.style.display = "none";
        this.gameArea.appendChild(sound);
        

        this.trigger(powerup, sound);
    }
    trigger(powerup, sound){
        // interval to detect if the powerup has been triggered
        const powerupInterval = setInterval(() => {

            // check if laser goes out of bounds and remove, else update position
            if(this.hit){
                powerup.src = './dist/assets/images/powerups/powerup_hit.gif';
                sound.play();

                setTimeout(() => {
                    powerup.remove();
                }, 700);
                
                setTimeout(() => {
                    sound.remove();
                }, 983);

                clearInterval(powerupInterval);
            }
        }, 10);
    }
}

export {Powerup as default};