import Player from './scripts/player';
import Wave from './scripts/wave';
import HighScore from './scripts/highscore';

// grab starting modal and play button
const startModal = document.querySelector('.start-modal');
const endModal = document.querySelector('.end-modal');
const play = document.querySelectorAll('.play');

// grab high scores
const highScore = new HighScore();
highScore.init();

setTimeout(() => {
    startModal.style.display = 'initial';
}, 500);

play.forEach(button => {
    button.addEventListener('click', () =>{

        // play the game!
        startModal.style.display = 'none';
        endModal.style.display = 'none';
        highScore.submit = false;

        // think object creation needs to be delayed slightly
        setTimeout(() => {

            const player = new Player();
            player.init();

            const wave = new Wave();
            wave.init();

            // grab score element
            const scoreBoard = document.querySelector('.score');
            let score = 0;
            scoreBoard.innerText = `SCORE: ${score}`;

            // play background music
            // const backgroundAudio = document.createElement('audio');
            // backgroundAudio.src = './dist/assets/sounds/music_background.mp3';
            // backgroundAudio.setAttribute("preload", "auto");
            // backgroundAudio.setAttribute("controls", "none");
            // backgroundAudio.style.display = "none";
            // document.querySelector('.game-area').appendChild(backgroundAudio);
            // backgroundAudio.loop = true;
            // backgroundAudio.play();

            // set up controller for collision detection
            function collisionDetection() {
                const collisionInterval = setInterval(() => {

                    // first update all the object arrays
                    player.updateLaserArray();
                    player.updateDinoArray();
                    player.updatePowerupArray();
                    wave.updateMeteorArray();

                    // check lose condition - all dinos are dead
                    // !player.dinoArray.length
                    if(!player.dinoArray.length){

                        // update final score
                        highScore.printFinalScore(score);

                        // display game over modal
                        endModal.style.display = 'initial';

                        // calls to remove event listeners on cannon
                        player.gameOver();

                        // stop wave loop
                        wave.gameover = true;

                        // clear meteor and powerup objects from game area
                        wave.meteorArray.forEach(meteor => {
                            const meteorElement = document.getElementById(`${meteor.meteorId}`);
                            meteorElement.remove();
                        });

                        player.powerupArray.forEach(powerup => {
                            const powerupElement = document.getElementById(`${this.powerupId}`);
                            powerupElement.remove();
                        });

                        // finally clear arrays
                        wave.updateMeteorArray();
                        player.updatePowerupArray();

                        // clear collision detection interval
                        clearInterval(collisionInterval);
                    }

                    // powerup check see if the updated meteor array contains 5 or more meteors if so lets give the player a power up
                    if (wave.meteorArray.length >= 4 && player.powerupArray.length < 1 && player.powerupOn === false){
                        player.createPowerup();
                    }

                    player.updatePowerupArray();

                    // loop through powerup array and check if any lasers are colliding with it.
                    player.powerupArray.forEach(powerup => {

                        const powerupElement = document.getElementById(`${powerup.powerupId}`);        
                        const powerupBoundingBox = powerupElement.getBoundingClientRect();

                        // We ideally need to create a circle for the powerups
                        // find the centre of the element, draw a circle with diameter equal to it's smallest side
                        // we don't even need to make a point cloud just test the laser top-left and top-right points to see if they lie inside =>
                        // (x - a)**2 = (y - b)**2 <= r**2 where (a,b) is the circle centre point and (x,y) are the laser coordinates

                        let powerupCenter = [];
                        let powerupRadius = 0;

                        // find the centre x-coord
                        if (powerupBoundingBox.left < powerupBoundingBox.right){
                            powerupCenter[0] = powerupBoundingBox.left + ((powerupBoundingBox.right - powerupBoundingBox.left)/2);
                        } else if (powerupBoundingBox.left > powerupBoundingBox.right){
                            // if rotated to upsidedown
                            powerupCenter[0] = powerupBoundingBox.right + ((powerupBoundingBox.left - powerupBoundingBox.right)/2);
                        } else {
                            // rare case they are equal - they shouldn't be?
                            powerupCenter[0] = powerupBoundingBox.left;
                        }

                        // find the centre y-coord
                        if (powerupBoundingBox.top < powerupBoundingBox.bottom){
                            powerupCenter[1] = powerupBoundingBox.top + ((powerupBoundingBox.bottom - powerupBoundingBox.top)/2);
                        } else if (powerupBoundingBox.top > powerupBoundingBox.bottom){
                            // if rotated to upsidedown
                            powerupCenter[1] = powerupBoundingBox.bottom + ((powerupBoundingBox.top - powerupBoundingBox.bottom)/2);
                        } else {
                            // rare case they are equal - they shouldn't be?
                            powerupCenter[1] = powerupBoundingBox.top;
                        }

                        // grab the radius
                        if(powerupBoundingBox.height > powerupBoundingBox.width){
                            powerupRadius = (powerupBoundingBox.width/2)*0.45;
                        } else {
                            powerupRadius = (powerupBoundingBox.height/2)*0.45;
                        }

                        // next check if shot by laser
                        player.laserArray.forEach(laser => {
                            
                            const laserElement = document.getElementById(`${laser.laserId}`);
                            const laserBoundingBox = laserElement.getBoundingClientRect();

                            // grab top-left & top-right coords
                            const laserTopLeft = [laserBoundingBox.left, laserBoundingBox.top];
                            const laserTopRight = [laserBoundingBox.right, laserBoundingBox.top];

                            // check for collision (x - a)**2 + (y - b)**2 <= r**2
                            if ((((laserTopLeft[0] - powerupCenter[0])**2) + ((laserTopLeft[1] - powerupCenter[1])**2)) <= powerupRadius**2 || (((laserTopRight[0] - powerupCenter[0])**2) + ((laserTopRight[1] - powerupCenter[1])**2)) <= powerupRadius**2){
                                powerup.hit = true;
                                laser.hit = true;
                                player.powerupActive(powerup.powerupType);
                            }
                        }); 
                    });

                    // update laser array before meteor checking.
                    player.updateLaserArray();

                    // loop through meteor and check if any lasers or dinos are colliding with it.
                    wave.meteorArray.forEach(meteor => {
                        
                        const meteorElement = document.getElementById(`${meteor.meteorId}`);        
                        const meteorBoundingBox = meteorElement.getBoundingClientRect();

                        // We ideally need to create a circle for the meteors
                        // find the centre of the element, draw a circle with diameter equal to it's smallest side
                        // we don't even need to make a point cloud just test the laser top-left and top-right points to see if they lie inside =>
                        // (x - a)**2 = (y - b)**2 <= r**2 where (a,b) is the circle centre point and (x,y) are the laser coordinates

                        // for the dino take the left and right side and the y = 0 coordinate if any lie in the meteor on landing - boom!
                        let meteorCenter = [];
                        let meteorRadius = 0;

                        // find the centre x-coord
                        if (meteorBoundingBox.left < meteorBoundingBox.right){
                            meteorCenter[0] = meteorBoundingBox.left + ((meteorBoundingBox.right - meteorBoundingBox.left)/2);
                        } else if (meteorBoundingBox.left > meteorBoundingBox.right){
                            // if rotated to upsidedown
                            meteorCenter[0] = meteorBoundingBox.right + ((meteorBoundingBox.left - meteorBoundingBox.right)/2);
                        } else {
                            // rare case they are equal - they shouldn't be?
                            meteorCenter[0] = meteorBoundingBox.left;
                        }

                        // find the centre y-coord
                        if (meteorBoundingBox.top < meteorBoundingBox.bottom){
                            meteorCenter[1] = meteorBoundingBox.top + ((meteorBoundingBox.bottom - meteorBoundingBox.top)/2);
                        } else if (meteorBoundingBox.top > meteorBoundingBox.bottom){
                            // if rotated to upsidedown
                            meteorCenter[1] = meteorBoundingBox.bottom + ((meteorBoundingBox.top - meteorBoundingBox.bottom)/2);
                        } else {
                            // rare case they are equal - they shouldn't be?
                            meteorCenter[1] = meteorBoundingBox.top;
                        }

                        // grab the radius
                        if(meteorBoundingBox.height > meteorBoundingBox.width){
                            meteorRadius = (meteorBoundingBox.width/2)*0.45;
                        } else {
                            meteorRadius = (meteorBoundingBox.height/2)*0.45;
                        }
                        
                        // no point checking the dinos for each meteor everytime so quick if statement to see if the meteor is below a certain point
                        //check the dinos first just incase the meteor gets deleted before going into dino loop
                        if(meteorBoundingBox.top > window.innerHeight*0.9 || meteorBoundingBox.bottom > window.innerHeight*0.9){
                            
                            player.dinoArray.forEach(dino => {

                                const dinoElement = document.getElementById(`${dino.dinoId}`);
                                const dinoBoundingBox = dinoElement.getBoundingClientRect();
                                let dinoPosition = [];

                                // grab the dino left and right positions - we are using the window.innerHeight here to ensure the meteor has hit the bottom.
                                if (dinoBoundingBox.left < dinoBoundingBox.right){
                                    dinoPosition = [(dinoBoundingBox.left + ((dinoBoundingBox.right - dinoBoundingBox.left)/2)), window.innerHeight];
                                } else {
                                    dinoPosition = [(dinoBoundingBox.right + ((dinoBoundingBox.left - dinoBoundingBox.right)/2)), window.innerHeight];
                                }
                    
                                //check for collision - this time only delete the meteor send the dinos flying so that they get deleted by out of bounds
                                // check for collision (x - a)**2 + (y - b)**2 <= r**2
                                // Note: the 3*radius here is to make the meteor impact bigger (mainly as some of the dino hitboxes are larger than the actual meteors)
                                if ((((dinoPosition[0] - meteorCenter[0])**2) + ((dinoPosition[1] - meteorCenter[1])**2)) <= (3*meteorRadius)**2){

                                    dino.hit = true;
                                    meteor.groundHit = true;
                                    meteorElement.style.height = "10%";
                                    meteorElement.style.width = "10%";
                                    meteorElement.src = './dist/assets/images/meteors/explosion_floor.gif';
                                    dino.flyDino(dinoElement);
                                } 
                            });
                        }
                        
                        if (meteorBoundingBox.top > window.innerHeight || meteorBoundingBox.bottom > window.innerHeight){
                                // no dinos were harmed!
                                meteor.groundHit = true;
                                meteorElement.style.height = "10%";
                                meteorElement.style.width = "10%";
                                meteorElement.src = './dist/assets/images/meteors/explosion_floor.gif';
                        }
                        
                        
                        // next check if shot by laser
                        player.laserArray.forEach(laser => {
                            
                            const laserElement = document.getElementById(`${laser.laserId}`);
                            const laserBoundingBox = laserElement.getBoundingClientRect();

                            // grab top-left & top-right coords
                            const laserTopLeft = [laserBoundingBox.left, laserBoundingBox.top];
                            const laserTopRight = [laserBoundingBox.right, laserBoundingBox.top];

                            // check for collision (x - a)**2 + (y - b)**2 <= r**2
                            if ((((laserTopLeft[0] - meteorCenter[0])**2) + ((laserTopLeft[1] - meteorCenter[1])**2)) <= meteorRadius**2 || (((laserTopRight[0] - meteorCenter[0])**2) + ((laserTopRight[1] - meteorCenter[1])**2)) <= meteorRadius**2){
                                meteor.damageTaken = player.damage;
                                meteor.hit = true;
                                laser.hit = true;
                                

                                // calculate score
                                if (meteor.hitPoints >= player.damage){
                                    score += player.damage*10;
                                } else {
                                    score += (player.damage - meteor.hitPoints)*10;
                                }

                                scoreBoard.innerText = `SCORE: ${score}`;
                                // meteorElement.src = './dist/assets/images/meteors/explosion.gif';
                            } else if (laserBoundingBox.top < 0 || laserBoundingBox.right < 0 || laserBoundingBox.left > window.innerWidth){
                                // delete laser if out of bounds
                                laser.hit = true;
                            }
                        });
                    });
                    
                }, 10); // should be 10
            }

            // start collision detection, delayed for a 3 secs just to give dinos a chance to render as it is used to check gameover condition and was
            // throwing it sometimes.
            setTimeout(() => {
                collisionDetection();
            }, 3000);   

        }, 500);
    });
});

