
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




