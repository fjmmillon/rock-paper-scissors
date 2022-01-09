const gameIter = gameGen();
gameIter.next();
let buttons = Array.from(document.querySelectorAll("button"));
buttons.forEach(button =>{
    button.addEventListener("click", (event) => {
        let playerSelection = event.target.id;
        let gameStatus = gameIter.next(playerSelection);
        updateLogger(`Player Selection: ${playerSelection}
        `+stringifyResultOfGen(gameStatus));
        });
    });


function updateLogger(str){
    document.querySelector('.logger').innerText = str;
}

function* gameGen(playerSel){
    let score = initialiceScore();
    let computerSelection;
    let turn = score;
    let playerSelection;
    while(true){
        playerSelection = yield ({score,computerSelection,'scoreAsStr':scoreAsStr(score),'playerSelection':playerSel,'strResultOfGame':strResultOfGame(turn)});
        computerSelection = computerPlay();
        turn = rockPaperScissorsGame(["computer",computerSelection],["player",playerSelection]);
        addToScore(score,turn);  
    }
};
function stringifyResultOfGen(yielded){
    return(
    `Computer Selection: ${yielded.value.computerSelection}
    ${yielded.value.strResultOfGame}
    ${yielded.value.scoreAsStr}`);
}

function initialiceScore(){
    return ({player:0,computer:0});
}
function playRound(playerSel, computerSel){
    let result = rockPaperScissorsGame(["computer",computerSel],["player",playerSel]);
    return strResultOfGame(result);
}
function addToScore(scoreObj, resultObj){
    Object.keys(scoreObj).forEach(key => scoreObj[key]+=resultObj[key]);
}
function scoreAsStr(scoreObj){
    return `Score:
    Player: ${scoreObj.player},
    Computer: ${scoreObj.computer}`;
}

function strResultOfGame(resultObj){
     let resultOfGame= resultObj.player-resultObj.computer;
     let output
     if(resultOfGame ==0 ){
         output = "Even Match!"
        }else{
            if( resultOfGame >0 ){
                output = "You win!";
            }else{
                output= "You lose!"
            }
        }
    return output; 

}
function rockPaperScissorsGame([playerOneName,playerOneSel],[playerTwoName,playerTwoSel]){
    if(playerOneSel==playerTwoSel) return ({[playerOneName]:0,[playerTwoName]:0});
    const beats = {'rock': 'scissors',
                    'paper':'rock',
                    'scissors':'paper'};
    let beated = beats[playerOneSel];
    let result = (playerTwoSel == beated) ?
                    ({[playerOneName]: 1, [playerTwoName]:0}):
                    ({[playerOneName]: 0, [playerTwoName]:1});
    return result;
}
function playerPlay(){
    let validOpts = gameOpts();
    let correctSel = 0;
    let msg = "rock, paper, scissors! Make your move!";
    let userSel;
    while(correctSel==0){
        userSel = prompt(msg).toLowerCase();
        validSelection(validOpts,userSel) ?
        (correctSel = 1):
        (correctSel = 0);
        msg = "Incorrect selection. Please, try again. Valid options are rock, paper and scissors";
    };
    return userSel;
}
function computerPlay(){
    let randomNum = Math.random();
    let opts = gameOpts();
    let move = randomOption(randomNum,opts.length);
    return opts[move];
}
function validSelection(arrValidOptions,str){
    return arrValidOptions.includes(str);
}
function gameOpts(){
    return ["rock","paper","scissors"];
}
function randomOption(randomNumber,numberOfOptions){
    //Supossing random bounds are 0 and 1 inclusive. If other limits are different, implement interface.
    return Math.floor(randomNumber/(1/numberOfOptions));
}
