import Meteor from './meteor';

class Wave {
    constructor(){
        this.gameArea = document.querySelector('.game-area');
        this.meteorArray = new Array();
        this.meteorCounter = 0;
        this.wave = 1;
        this.waveSize = Math.round((this.wave**2) + 10);
        this.waveRemianing = this.waveSize;
        this.intervalMax = 5000;
        this.intervalMin = 3000;
        this.meteorMax = Math.round(this.waveSize*0.1);
        this.meteorMin = Math.round(this.waveSize*0.01);
        this.meteorVmax = 1;
        this.meteorVmin = 0.5;
        this.gameover = false;
    }
    init(){
        this.waveGenerator();
    }
    updateMeteorArray(){

        const filteredArray = this.meteorArray.filter(meteor => {
            return document.getElementById(`${meteor.meteorId}`) !== null
        });
        
        this.meteorArray = filteredArray;
        
    }
    waveGenerator(){

        // catch if game over
        if (this.gameover){
            return;
        }

        const intervalTime = Math.random()*(this.intervalMax - this.intervalMin) + this.intervalMin;
        const meteorAmount = Math.round(Math.random()*(this.meteorMax - this.meteorMin) +this.meteorMin); 
        
        setTimeout(() => {
            for(let i = 1; i <= meteorAmount; i++){

                // grab meteor array current length before creating a new element
                const meteorArraySize = this.meteorArray.length;

                // perform meteor type roll
                const meteorHp = this.meteorRoll();

                // set the velocity
                const meteorVelocity = Math.random()*(this.meteorVmax - this.meteorVmin) + this.meteorVmin;

                // this.meteorArray[meteorArraySize] = new Meteor(this.meteorCounter);
                this.meteorArray.push(new Meteor(this.meteorCounter, meteorVelocity, meteorHp));
                this.meteorArray[meteorArraySize].init();

                this.meteorCounter++;
            }

            this.waveRemianing -= meteorAmount;

            if(this.waveRemianing <= 0){
                // next wave! Update all properties
                console.log('new wave!');
                this.wave ++;
                this.waveSize = Math.round((this.wave**2) + 10);
                this.waveRemianing = this.waveSize;
                this.intervalMax = 5000 - (this.wave*100);
                this.intervalMin = 3000 - (this.wave*100);
                this.meteorMax = Math.round(this.waveSize*0.1);
                this.meteorMin = Math.round(this.waveSize*0.01);
                this.meteorVmax = 1 + (this.wave*0.05);
                this.meteorVmin = 0.5 + (this.wave*0.05);
                this.waveGenerator();
            } else{
                this.waveGenerator();
            }
        }, intervalTime);          
        
    }
    meteorRoll(){

        // meteor roll
        const meteorRollVar = Math.round(Math.random()*100);
        let meteorHp = 1;

        // type of meteor are limited beased on current wave number
        if(this.wave < 3){
            // ratio 75%/25%
            if (meteorRollVar >= 75){
                meteorHp = 2;
            } else {
                meteorHp =1;
            }
        } else if (this.wave < 5){
            // ratio 61.5%/25%/12.5%
            if (meteorRollVar >= 88){
                meteorHp = 3;
            } else if (meteorRollVar >= 63) {
                meteorHp =2;
            } else {
                meteorHp =1;
            }
        } else if (this.wave < 7){
            // ratio 56.25%/25%/12.5%/6.25%
            if (meteorRollVar >= 94){
                meteorHp = 4;
            } else if (meteorRollVar >= 81) {
                meteorHp = 3;
            } else if (meteorRollVar >= 56) {
                meteorHp =2;
            } else {
                meteorHp =1;
            }
        } else if (this.wave < 10){
            // ratio 53.125%/25%/12.5%/6.25%/3.125%
            if (meteorRollVar >= 97){
                meteorHp = 5;
            } else if (meteorRollVar >= 91) {
                meteorHp = 4;
            } else if (meteorRollVar >= 78) {
                meteorHp = 3;
            } else if (meteorRollVar >= 53) {
                meteorHp = 2;
            } else {
                meteorHp =1;
            }
        } else {
            // ratio 51.5625%/25%/12.5%/6.25%/3.125%/1.5625%
            if (meteorRollVar >= 98){
                meteorHp = 6;
            } else if (meteorRollVar >= 95) {
                meteorHp = 5;
            } else if (meteorRollVar >= 89) {
                meteorHp = 4;
            } else if (meteorRollVar >= 77) {
                meteorHp = 3;
            } else if (meteorRollVar >= 52) {
                meteorHp = 2;
            } else {
                meteorHp =1;
            }
        }
        return meteorHp;
    }
}

export {Wave as default};