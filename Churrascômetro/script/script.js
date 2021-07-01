// (Carne) 400g - adulto/ 650 p/+6h
// (cerveja)1200ml - adulto / 2000ml p/ +6h
// (bebidas) 1000ml - pessoa / 1500ml p/ + 6h

//carne e bebida para criança é metade


var adultos = document.getElementById("adultos")
var criança = document.getElementById("criancas")
var duração = document.getElementById("duracao")
var resultado = document.getElementById("resultado")
var time = duração.value


function calcular() {

    let carne = calcularCarne()

    let cerveja = calcularCerveja() 

    let bebidas = calcularBebidas()

    console.log(carne, cerveja, bebidas)

    resultado.innerHTML=`<p>${carne/1000}kg de Carne</p>`
    resultado.innerHTML+=`<p>${Math.ceil(cerveja/355)}Latas de cerveja</p>`
    resultado.innerHTML+=`<p>${Math.ceil(bebidas/2000)} garrafas de 2L</p>`
    
   
}


function calcularCerveja() {
    let time = duração.value

    return (adultos.value * cervejaPA(time))
}

function calcularCarne() {
    let time = duração.value

    return ( adultos.value * carnepp(time) + (criança.value * carnepp(time) / 2))

}


function calcularBebidas() {
    let time = duração.value
    return ( adultos.value * bebidasPP(time) + (criança.value * bebidasPP(time) / 2))
}


function carnepp(time) {
    if (time >= 6) {
        return 650
    } else {
        return 400
    }
}

function cervejaPA(time) {
    if (time >= 6) {
        return 2000
    } else {
        return 1200
    }
}
function bebidasPP(time) {
    if (time >= 6) {
        return 1500
    } else {
        return 1000
    }
}
