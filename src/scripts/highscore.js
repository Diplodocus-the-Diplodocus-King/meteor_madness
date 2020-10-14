class HighScore {
    constructor(){
        this.highScoreContainer = document.querySelector('.highscore-container');
        this.filename = './dist/assets/json/highscore.json';
        this.highScoresDb = db.collection('highscores');
        this.highScores = new Array();
        this.finalScore = document.querySelector('.final-score');
        this.finalScoreVal = 0;
        this.highScoreForm = document.querySelector('.highscore-form');
        this.nameInput = document.querySelector('.highscore-name');
        this.submit = false;
    }
    init(){
       
        // read in high scores
        this.highScoreContainer.innerHTML = ' ';

        this.highScoresDb.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added'){
                    let player = change.doc.data();
                    player.id = change.doc.id;
                    this.highScores.push(player);
                }
            });
            this.displayHighScores();
        });
        
        // on submission of name check if player has high score and overwrite
        this.highScoreForm.addEventListener('submit', e => {
            e.preventDefault();

            if(!this.submit){

                this.submit = !this.submit;

                // update high scores array
                for(let index = 0; index < this.highScores.length; index++){
                    // if the players score is greater than any highscore push it to the array
                    if(this.highScores[index].score < this.finalScoreVal){
                        this.highScores.push({
                            id: undefined,
                            rank: this.highScores[index].rank,
                            name: this.nameInput.value,
                            score: this.finalScoreVal
                        });
                        
                        let playerRank = this.highScores[index].rank;
                        // update ranks for the remaining high scores
                        for(let i=index; i < this.highScores.length-1; i++){
                            playerRank++;
                            this.highScores[i].rank = playerRank;
                        }
                        break;
                    } 
                }

                // sort scores
                this.highScores.sort((a, b) => {
                    if (a.score > b.score){
                        return -1;
                    } else if (b.score > a.score){
                        return 1;
                    } else {
                        return 0;
                    }
                });

                // update firebase 
                this.highScores.forEach(player => {
                    if(player.id && player.rank < 11){
                        this.highScoresDb.doc(player.id).set({
                            rank: player.rank,
                            name: player.name,
                            score: player.score
                        }).then(() => {
                            console.log('write successful');
                        }).catch(error =>{
                            console.log(error);
                        });
                    } else if (player.id && player.rank === 11){
                        this.highScoresDb.doc(player.id).delete()
                        .then(() => {
                            console.log('delete successful');
                        }).catch(error =>{
                            console.log(error);
                        });
                    } else {
                        this.highScoresDb.add({
                            rank: player.rank,
                            name: player.name,
                            score: player.score
                        }).then(docRef => {
                            console.log('add successful');
                            player.id = docRef.id;
                        }).catch(error =>{
                            console.log(error);
                        });
                    }
                });
            }       
        });
    }
    printFinalScore(score){
        this.finalScoreVal = score;
        this.finalScore.innerText = `Score: ${score}`;
    }
    displayHighScores(){
        // sort scores
        this.highScores.sort((a, b) => {
            if (a.score > b.score){
                return -1;
            } else if (b.score > a.score){
                return 1;
            } else {
                return 0;
            }
        });

        //catch if highscore list has 11 players in it
        if(this.highScores.length > 10){
            this.highScores.pop();
        }
        
        // populate highscore list
        this.highScoreContainer.innerHTML = ' ';
        this.highScores.forEach(player => {
            this.highScoreContainer.innerHTML += `<p>${player.rank}. ${player.name}: ${player.score}`;
        });
    }
}

export {HighScore as default};