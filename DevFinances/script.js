
var Modal = document.querySelector(".modal-overlay")

const modal = {
    open() {
        Modal.classList.add("active")
    },
    close() {
        Modal.classList.remove("active")
    }

}

const Storage ={
    get(){
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },

    set(transactions){

        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))

    }
}

const Transaction = {
    all: Storage.get(), /*Preparando o objeto para json */

    add(transaction) { /*Criando método para guardar novas transações */
        Transaction.all.push(transaction)

        App.reload()
    },
    remove(index) {
        Transaction.all.splice(index, 1) /*splice é um método aplicado a arrays. Ele espera o index da array(posição) e a quantidade de remoção*/
        App.reload()
    },

    incomes() { /* Somando entradas*/
        let income = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0) {
                income += transaction.amount;
            }
        })
        return income
    },
    expenses() { /*Somando saidas */
        let expense = 0
        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expense += transaction.amount
            }
        })
        return expense
    },
    total() { /*Somando total */
        let total = Transaction.incomes() + Transaction.expenses()
        return total
    }

}

const DOM = {

    transactionsContainer: document.querySelector("#data-table tbody"), /*Guardando o elemento tbody em uma variável*/


    addTransaction(transaction, index) { /*Criando o elemento tr para ser incluido no tbody e posição na array*/
        const tr = document.createElement("tr")
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction, index) { /*Organizando estrutura para ser setada no html em tbody */
        const CSSclass = transaction.amount > 0 ? "income" : "expense" /*modificando cor da entrada, ou saida de dinheiro */
        const amount = Utils.formatCurrency(transaction.amount) /*Utilizando a formatação da moeda */
        const html = `   
         <td class="description">${transaction.description}</td>
         <td class=${CSSclass}>${amount}</td>
         <td class="date">${transaction.date}</td>
         <td >
            <img onclick = "Transaction.remove(${index})" src="./imagens/minus.svg"> 
         </td>

         `
        return html
    },

    updateBalance() {
        document.getElementById("incomeDisplay").innerHTML = /*Mostrando no card o valor das entradas*/
            Utils.formatCurrency(Transaction.incomes()) /*Formatando o valor para moeda */


        document.getElementById("expenseDisplay").innerHTML =/*Mostrando no card o valor de saídas */
            Utils.formatCurrency(Transaction.expenses()) /*Formatando o valor para moeda */

        document.getElementById("totalDisplay").innerHTML =/*Mostrando no card o valor total */
            Utils.formatCurrency(Transaction.total()) /*Formatando o valor para moeda */
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }

}

const Utils = { /*Formatação do valor em moeda*/
    formatAmount(value) {
        value = Number(value.replace(/\,/g,'')) * 100

        return value
    },

    formatdate(date) {
        const splittedDate = date.split("-") /*Substituindo os traços na data do input */
        return `${splittedDate[2]}/ ${splittedDate[1]}/${splittedDate[0]}` /*Formatando a data */
       
    },

    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""
        value = String(value).replace(/\D/g, "") /*Procura tudo que não é número e substitui*/

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        }) /*Transformando valor em moeda*/
        return signal + value
    }
}

const Form = {
    description: document.querySelector("input#description"), /*pegando o valor de input */
    amount: document.querySelector("input#amount"), /*pegando o valor de input */
    date: document.querySelector("input#date"), /*pegando o valor de input */

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateFields() {
        const { description, amount, date } = Form.getValues()
        if (description.trim() === "" || amount.trim() === "" || date.trim() === "") {

            throw new Error("Por favor, preencha todos os campos")
        }
    },

    formatValues() {
        let { description, amount, date } = Form.getValues()
        amount = Utils.formatAmount(amount)
       
        
        date = Utils.formatdate(date)

        return {description, amount, date}
    },

    clearFields(){
        Form.description.value=""
        Form.amount.value=""
        Form.date.value=""
    },


    submit(event) {
        event.preventDefault()
        try {
            Form.validateFields() //validando campos
            let transaction = Form.formatValues() //formatar a data
            
            Transaction.add(transaction) // salvando dados do formulário

            Form.clearFields() //limpando as informações do formulário

            modal.close() //fechando o modal

        } catch (error) {
            alert(error.message)
        }
        
    }
}




const App = {
    init() {

        Transaction.all.forEach((transaction, index) => { /*   Estrutura de repetição para colocar todos os index do objeto transactions; forEach = Para todo elemento dentro da array*/
            DOM.addTransaction(transaction, index)/*Adicionando  função para atualiazar valores */
        })
        DOM.updateBalance()/*Formatando o valor monetário */
        
        Storage.set(Transaction.all) /*Setando dados no localStorage */
    },

    reload() {
        DOM.clearTransactions()
        App.init()
    }
}

App.init()

