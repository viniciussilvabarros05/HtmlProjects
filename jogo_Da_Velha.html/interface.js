document.addEventListener("DOMContentLoaded", () => {
    let squares = document.querySelectorAll(".square"); /*Nesta parte a variável se apresenta como umn Nó, ou uma array */

    squares.forEach((square) => { //Para cada item dentro do nó
        square.addEventListener("click", HandleClick); //Adicionar o evento HandleClick quando clicar o objeto
    })


})


let board = ['','','','','','','','','']
let playerTime= 2
let symbols= ['-','o','x']
let gameover = false

let win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

]


function handLeMove(position){

    if (gameover){ // Setado inicialmente como false, para quando estiver como true, parar a função handLeMove
        return 
    }
    if (board[position] == ''){ // condição para que os simbolos não sejam 
        //sobrepostos, não ocupem a mesma posição
        board[position] = symbols[playerTime] //colocando o ou x no array board
        
        gameover = isWin();

        playerTime = (playerTime == 2) ? 1:2
       
    }


    return gameover
}


function isWin(){ //Regra para saber quando o jogador ganha
  

    for(let i = 0; i< win.length; i++){
        let seq = win[i]

        let pos1 = seq[0]
        let pos2 = seq[1]
        let pos3 = seq[2]

        if (board[pos1] == board[pos2] && board[pos2]== board[pos3] && board[pos1] != '' ){
            return true
        }

    }
}



function HandleClick(event) {
    let square_id = event.target.id

    if (handLeMove(square_id)) {// Pega a posição de onde foi clicado e muda de quem é a vez de jogar
        setTimeout(() => {
            alert("o jogo acabou - o vencedor foi o jogador " + playerTime)
        }, 10);
    };
    updateSquares(); //atualizar o tabuleiro


}

/*Neste pedaço do código, estará atualizando visualmente o que o array board está recebendo em sua posições */

function updateSquares() {

    let squares = document.querySelectorAll(".square")

    squares.forEach(square => {
        let position = square.id
        let symbol = board[position]; //chamando o array board na position square_id
        if (symbol != '') {
            square.innerHTML = `<div class = '${symbol}'><div>`
        }


    })

}

function restart() {
   
   
    let squares = document.querySelectorAll(".square")

    squares.forEach(square => {
       
        let position = square.id
       
        let symbol = board[position]; //chamando o array board na position square_id
        if (symbol != '') {
            square.innerHTML = `<div class = "delete" ><div>`
        }
    
    })

    for (let i = 0; i< board.length; i++){
        board[i] = '' 
    }

    gameover = false
    return gameover
    
}


