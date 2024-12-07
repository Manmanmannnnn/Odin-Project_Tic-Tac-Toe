const drawingCells=document.querySelectorAll('.cell');
const player1Score=document.querySelector('.firstPlayerScore');
const player2Score=document.querySelector('.secondPlayerScore');
const player1Name=document.querySelector('.firstPlayerName');
const player2Name=document.querySelector('.secondPlayerName');
const roundWinnerDialog=document.querySelector('#roundWinner');
const nextRoundBtn=document.querySelector('#nextRoundBtn');
const roundResultText=document.querySelector('#resultText');
const gameWinnerDialog=document.querySelector('#gameWinner');
const playAgainBtn=document.querySelector('#playAgainBtn');
const gameResultText=document.querySelector('#gameResultText');
const resetBtn=document.querySelector('#resetBtn');



const playersInfo= (function(){
    
    let firstPlayerName='Zap';
    let secondPlayerName='Pepz';

    player1Name.textContent=firstPlayerName;
    player2Name.textContent=secondPlayerName;


    const firstPlayerMarker='X';
    const secondPlayerMarker='O';

    let firstPlayerScore=0;
    let secondPlayerScore=0;

    let playBoard=[];

    return {firstPlayerName,firstPlayerMarker,
        secondPlayerName,secondPlayerMarker,playBoard,
        firstPlayerScore,secondPlayerScore}
})();



const gameFunctions=function(players){

    let xmark ='<img src="./close_200dp_434343_FILL0_wght700_GRAD0_opsz48.svg" alt="">'
    let omark ='<img src="./radio_button_unchecked_200dp_434343_FILL0_wght700_GRAD0_opsz48.svg" alt="">'


const playersTurn=(index)=>{

    //exclude empty cells that still counted as length
    let stored=players.playBoard.filter(el=>el==='X'||el==='O')

    //marks X to the cell clicked for player1 turn
    if(stored.length%2===0||stored.length===0){
        if(players.playBoard[index])return;
        players.playBoard[index]=players.firstPlayerMarker;
        drawingCells[index].innerHTML=xmark;   
    }

     //marks O to the cell clicked for player2 turn
    else if (stored.length%2!==0){
        if(players.playBoard[index])return;
        players.playBoard[index]=players.secondPlayerMarker;
        drawingCells[index].innerHTML=omark;
    }
}

const winChecker=()=>{

    if(players.firstPlayerScore===3||players.secondPlayerScore===3){
        return
    }

    



    //exclude empty cells that still counted as length
    let stored=players.playBoard.filter(el=>el==='X'||el==='O')

    if( `${players.playBoard[0]}${players.playBoard[1]}${players.playBoard[2]}`==='XXX'||
        `${players.playBoard[3]}${players.playBoard[4]}${players.playBoard[5]}`==='XXX'||
        `${players.playBoard[6]}${players.playBoard[7]}${players.playBoard[8]}`==='XXX'||
        `${players.playBoard[0]}${players.playBoard[3]}${players.playBoard[6]}`==='XXX'||
        `${players.playBoard[1]}${players.playBoard[4]}${players.playBoard[7]}`==='XXX'||
        `${players.playBoard[2]}${players.playBoard[5]}${players.playBoard[8]}`==='XXX'||
        `${players.playBoard[0]}${players.playBoard[4]}${players.playBoard[8]}`==='XXX'||
        `${players.playBoard[2]}${players.playBoard[4]}${players.playBoard[6]}`==='XXX')
        {
            players.firstPlayerScore++;
            player1Score.textContent=players.firstPlayerScore;
            players.playBoard.length=0;
            
            if(players.firstPlayerScore===3){

            }

            roundResultText.textContent=`${players.firstPlayerName} wins the round!`
            roundWinnerDialog.showModal();
        }

    else if(`${players.playBoard[0]}${players.playBoard[1]}${players.playBoard[2]}`==='OOO'||
            `${players.playBoard[3]}${players.playBoard[4]}${players.playBoard[5]}`==='OOO'||
            `${players.playBoard[6]}${players.playBoard[7]}${players.playBoard[8]}`==='OOO'||
            `${players.playBoard[0]}${players.playBoard[3]}${players.playBoard[6]}`==='OOO'||
            `${players.playBoard[1]}${players.playBoard[4]}${players.playBoard[7]}`==='OOO'||
            `${players.playBoard[2]}${players.playBoard[5]}${players.playBoard[8]}`==='OOO'||
            `${players.playBoard[0]}${players.playBoard[4]}${players.playBoard[8]}`==='OOO'||
            `${players.playBoard[2]}${players.playBoard[4]}${players.playBoard[6]}`==='OOO')
        {
            players.secondPlayerScore++;
            player2Score.textContent=players.secondPlayerScore;
            players.playBoard.length=0;
            roundResultText.textContent=`${players.secondPlayerName} wins the round!`
            roundWinnerDialog.showModal();
        }

    else if(stored.length===9){
        players.playBoard.length=0;
        roundResultText.textContent=`Its a draw!`
        roundWinnerDialog.showModal();
    }

}

const overAllWinner=()=>{
    if(players.firstPlayerScore===3){
        players.firstPlayerScore=0;
        player1Score.textContent=players.firstPlayerScore;
        gameResultText.textContent=`Congratulations! ${players.firstPlayerName} wins the game!`
        gameWinnerDialog.showModal();
    }

    else if(players.secondPlayerScore===3){
        players.secondPlayerScore=0;
        player2Score.textContent=players.secondPlayerScore;
        gameResultText.textContent=`Congratulations! ${players.secondPlayerName} wins the game!`
        gameWinnerDialog.showModal();
    }
    return
}



return{winChecker,overAllWinner,playersTurn}
};

const players=playersInfo;
const gameInfo=gameFunctions(players);

drawingCells.forEach((cell,index)=>{

    cell.addEventListener('click',(functions)=>{
       gameInfo.playersTurn(index);
       gameInfo.winChecker();
       gameInfo.overAllWinner();
       

    })
})

nextRoundBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    roundWinnerDialog.close();
    drawingCells.forEach(cell=>cell.innerHTML='');
});

playAgainBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    gameWinnerDialog.close();
    roundWinnerDialog.close();
    drawingCells.forEach(cell=>cell.innerHTML='');
})

resetBtn.addEventListener('click',()=>{
    drawingCells.forEach(cell=>cell.innerHTML='');
    players.firstPlayerScore=0;
    player1Score.textContent=players.firstPlayerScore;
    players.secondPlayerScore=0;
    player2Score.textContent=players.secondPlayerScore;
})





