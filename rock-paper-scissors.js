function game(){
    let score = initialiceScore();
    for(let i = 1; i <= 5; i++){
        let playerSelection = playerPlay();
        console.log(`Player selection: ${playerSelection}`);
        let computerSelection = computerPlay();
        console.log(`Computer selection: ${computerSelection}`);
        console.log(playRound(playerSelection, computerSelection));
        addToScore(score,rockPaperScissorsGame(["computer",computerSelection],["player",playerSelection]));
    }
    console.log("Final "+scoreAsStr(score));
    console.log(strResultOfGame(score));
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
