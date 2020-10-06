import Dino from './dino';
import Laser from './laser';
import Powerup from './powerup';

class Player{
    constructor(){
        this.gameArea = document.querySelector('.game-area');
        this.cannon = document.querySelector('.laser-cannon');
        this.dinoArray = new Array();
        this.laserArray = new Array();
        this.powerupArray = new Array();
        this.laserCounter = 0;
        this.powerupCounter = 0;
        this.firerate = 500;
        this.damage = 1;
        this.shots = 1;
        this.gunReloaded = true;
        this.powerupOn = false;
    }
    init(){

        // load dinosaurs (hit points: 20)
        this.createDinos();

        // set initial position of cannon
        this.cannon.style.left = `${(window.innerWidth/2) - (this.cannon.width/2)}`;
        // ensure cannon always stays in the centre on resize
        window.onresize = () => {
            this.cannon.style.left = `${(window.innerWidth/2) - (this.cannon.width/2)}`;
        }

        // create event listener for cannon movement
        window.addEventListener('mousemove', e => {
            this.rotateCannon(e);            
        });

        // create event listener for fire
        window.addEventListener('click', () => {
            // if check is for fire rate see setTimeout below
            if(this.gunReloaded){

                this.gunReloaded = !this.gunReloaded;
                // grab cannon position
                const xPosition = (window.innerWidth/2);
                const yPosition = this.cannon.height/2;

                // rotation is an absolute pain in the arse here...
                // first we need to grab the computed style rather than just the style string and the calculate the rotation from one of the matrix values given
                const transformMatrix = window.getComputedStyle(this.cannon, null).getPropertyValue('transform');
                const matrixArray = transformMatrix.slice(transformMatrix.indexOf('(')+1, transformMatrix.indexOf(')')).split(', ');
                // the matrix value we want is the 2nd which represents the skewY() - note for simple 2d rotation skewY() = -skewX() (3rd matrix pos)
                const rotation = Math.asin(matrixArray[1]);
                // const rotation = this.cannon.style.transform;
                
                // wrap in if for 3 shot
                if (this.shots > 1){
                    // run 3 shot code
                    const shotArray = [-0.35, 0, 0.35];

                    for(let i = 0; i<3; i++){
                        // grab laser array current length before creating a new element
                        const laserArraySize = this.laserArray.length;

                        // this.laserArray[laserArraySize] = new Laser(this.laserCounter, xPosition, yPosition, rotation);
                        this.laserArray.push(new Laser(this.laserCounter, xPosition, yPosition, (rotation + shotArray[i]), this.damage));
                        this.laserArray[laserArraySize].init();

                        // add to laser counter (catch if going over 100, just to prevent number getting too large - this may change depening on number of lasers to be on screen)
                        if(this.laserCounter >= 999){
                            this.laserCounter = 0;
                        } else {
                            this.laserCounter ++;
                        }
                    }
                } else {
                    // grab laser array current length before creating a new element
                    const laserArraySize = this.laserArray.length;

                    // this.laserArray[laserArraySize] = new Laser(this.laserCounter, xPosition, yPosition, rotation);
                    this.laserArray.push(new Laser(this.laserCounter, xPosition, yPosition, rotation, this.damage));
                    this.laserArray[laserArraySize].init();

                    // add to laser counter (catch if going over 100, just to prevent number getting too large - this may change depening on number of lasers to be on screen)
                    if(this.laserCounter >= 999){
                        this.laserCounter = 0;
                    } else {
                        this.laserCounter ++;
                    }
                }                

                setTimeout(() => {
                    this.gunReloaded = !this.gunReloaded;
                }, this.firerate);
            }

        });
    }
    createDinos(){
        // grab json file this contains the source location for each dinosaur svg
        const filename = './dist/assets/json/dino.json';

        fetch(filename).then(response => {
            return response.json();
        }).then(data => {
            data.forEach((item, index) => {
                this.dinoArray[index] = new Dino(item, index);
                this.dinoArray[index].init();
            });
        });
    }
    createPowerup(){
        
        // grab the powerup array current length before creating a new element
        const powerupArraySize = this.powerupArray.length;

        // create powerup
        this.powerupArray.push(new Powerup(this.powerupCounter));
        this.powerupArray[powerupArraySize].init();

    }
    rotateCannon(e){
        
        // grab distances from cannon to cursor and apply trig to obtain cannon rotation
        // note here window.inner(width/height) are equal to the cursor event client(x/y)
        const lengthX = (window.innerWidth/2) - e.clientX;
        let lengthY = (window.innerHeight - (this.cannon.height/2)) - e.clientY;

        // catch if cursor falls below half the cannon height
        if (e.clientY >= (window.innerHeight - (this.cannon.height/2))){
            lengthY = 1;
        } 

        const rotation = Math.atan(lengthX/lengthY);
        
        this.cannon.style.transform = `rotate(${-rotation}rad)`;
    }
    powerupActive(powerupType){
        // turn power up on
        this.powerupOn = true;

        // depending on the type change character stat.
        switch(powerupType){
            case 0:
                this.firerate = 250;
                break;
            case 1:
                this.damage = 2;
                break;
            case 2:
                this.shots = 3;
        }

        setTimeout(() => {
            this.powerupOn = false;
            console.log('powerdown');
            this.firerate = 500;
            this.damage = 1;
            this.shots = 1;
        }, 15000);
    }
    updateLaserArray(){
        const filteredArray = this.laserArray.filter(laser => {
            return document.getElementById(`${laser.laserId}`) !== null
        });

        this.laserArray = filteredArray;
    }
    updateDinoArray(){
        const filteredArray = this.dinoArray.filter(dino => {
            return document.getElementById(`${dino.dinoId}`) !== null
        });

        this.dinoArray = filteredArray;
    }
    updatePowerupArray(){
        const filteredArray = this.powerupArray.filter(powerup => {
            return document.getElementById(`${powerup.powerupId}`) !== null
        });

        this.powerupArray = filteredArray;
    }
}

export {Player as default};