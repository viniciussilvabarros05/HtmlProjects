document.addEventListener("DOMContentLoaded", () => {
    let squares = document.querySelectorAll(".square"); /*Nesta parte a variável se apresenta como umn Nó, ou uma array */

    squares.forEach((square) => { //Para cada item dentro do nó
        square.addEventListener("click", HandleClick); //Adicionar o evento HandleClick quando clicar o objeto
    })


})


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


