class Meteor {
    constructor(idNumber, meteorVelocity, meteorHp){
        this.meteorId = `meteor-${idNumber}`;
        this.gameArea = document.querySelector('.game-area');
        this.xPosition = Math.random()*(window.innerWidth - 100);
        this.yPosition = -100;
        this.rotation =  Math.random()*(36*(Math.PI/180));
        this.hitPoints = meteorHp;
        this.velocity = meteorVelocity;
        this.spinV = Math.random()*(0.03 - 0.001) + 0.001;
        this.spinDirection = Math.random();
        this.spin = 0;
        this.hit = false;
        this.groundHit = false;
        this.damageTaken = 1;
    }
    init(){
        // create the meteor element
        const meteor = document.createElement('img');

        // set source based on hp
        switch(this.hitPoints){
            case 1:
                meteor.src = './dist/assets/images/meteors/meteor_basic.svg';
                break;
            case 2:
                meteor.src = './dist/assets/images/meteors/meteor_2.svg';
                break;
            case 3:
                meteor.src = './dist/assets/images/meteors/meteor_3.svg';
                break;
            case 4:
                meteor.src = './dist/assets/images/meteors/meteor_4.svg';
                break;
            case 5:
                meteor.src = './dist/assets/images/meteors/meteor_5.svg';
                break;
            case 6:
                meteor.src = './dist/assets/images/meteors/meteor_6.svg';
        }

        // meteor.src = './dist/assets/images/meteors/meteor_basic.svg';
        // set classes and id and append to game area
        meteor.classList.add('meteor');
        meteor.setAttribute('id', `${this.meteorId}`);
        this.gameArea.appendChild(meteor);

        // position meteor somewhere along the top of the game area (initialised -100px from top)
         // note its path will be set by this.rotation - this should be limited depending on where it starts so it doesn't fly off screen before hitting the ground
        meteor.style.left = this.xPosition;
        meteor.style.top = this.yPosition;

        // set initial position
        const xInitial = this.xPosition;

        // create sound for meteor
        const sound = document.createElement("audio");
        sound.src = './dist/assets/sounds/explosion_asteroid.mp3';
        sound.setAttribute("preload", "auto");
        sound.setAttribute("controls", "none");
        sound.style.display = "none";
        this.gameArea.appendChild(sound);
        
        this.moveMeteor(meteor, xInitial, sound);
    }
    moveMeteor(meteor, xInitial, sound){
        const meteorInterval = setInterval(() => {

            // update meteor position
            this.yPosition += this.velocity*Math.cos(this.rotation);
            // direction dependant on which side of the screen it begins
            if (xInitial < window.innerWidth/2){
                this.xPosition += this.velocity*Math.sin(this.rotation);
            } else {
                this.xPosition -= this.velocity*Math.sin(this.rotation);
            }
            
            if (this.spinDirection > 0.5){
                this.spin += this.spinV;
            } else {
                this.spin -= this.spinV;
            }

            // check if meteor goes out of bounds and remove, else update position
            if (this.hit || this.groundHit){

                this.hitPoints -= this.damageTaken;
                
                if (this.hitPoints <= 0 || this.groundHit){

                    if (this.groundHit === false){
                        meteor.src = './dist/assets/images/meteors/explosion.gif';
                    }
                    
                    meteor.style.transform = `rotate(0rad)`;
                    clearInterval(meteorInterval);
    
                    sound.play();
    
                    setTimeout(() => {
                        meteor.remove();
                    }, 700);
    
                    setTimeout(() => {
                        sound.remove();
                    }, 842);

                } else {

                    //update css positions
                    meteor.style.left = this.xPosition;
                    meteor.style.top = this.yPosition;
                    meteor.style.transform = `rotate(${this.spin}rad)`;
                    this.hit = !this.hit;
                }                
            } else {
                //update css positions
                meteor.style.left = this.xPosition;
                meteor.style.top = this.yPosition;
                meteor.style.transform = `rotate(${this.spin}rad)`
            }
        }, 10);
    }
}

export {Meteor as default};