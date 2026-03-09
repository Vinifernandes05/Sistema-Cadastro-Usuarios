// Tela dinâmica para a página; Receber dados do usuário, e enviar para a rota /salvarusuarios

const app = document.getElementById("app")
const menu = document.getElementById("menu")

function botaoVoltar() { 
    app.innerHTML = ""
}

function mostrarCadastro () {
    app.innerHTML = `
    <h2>Tela de Cadastro de Usuário</h2>
                
    <form id="formCadastro">
        Nome Completo: <input type="text" id="nomecompleto"><br><br>
        Email: <input type="email" id="email"><br><br>
        CPF: <input type="text" id="cpf"><br><br>
        CEP: <input type="text" id="cep"><br><br>

        <button type="button" onclick="botaoVoltar()">Voltar</button>
        <button type="submit">Cadastrar</button>
    </form>

    <div id="mensagem"></div>
    `

    document
        .getElementById("formCadastro")
        .addEventListener("submit", enviarFormulario)
}


async function mostrarLista () {
    app.innerHTML = `<h2>Tela de Listagem dos Usuários</h2>`
    
    const resposta = await fetch("/listarusuarios", {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })

    const dados = await resposta.json()

    if (!dados.valido) {
        app.innerHTML += `<p> ${dados.mensagem} </p>
        <button onclick="botaoVoltar()">Voltar</button>`
        return
    }

    let lista = ""
    for (let i = 0; i < dados.dados.length; i++) {
        lista += `<form> 
                    <h2> Usuário ${i + 1} </h2>
                    <p> Nome Completo: ${dados.dados[i].nomecompleto} </p>
                    <p> Email: ${dados.dados[i].email} </p>
                    <p> CPF: ${dados.dados[i].cpf} </p>
                    <p> CEP ${dados.dados[i].cep} </p>
                  </form>`
    }
    app.innerHTML += lista
        app.innerHTML += `<button onclick="botaoVoltar()">Voltar</button>`
}


function mostrarEditar () {
    app.innerHTML = `
    <h2>Tela de Edição do Usuário</h2>
    <button onclick="botaoVoltar()">Voltar</button>
    `
}


async function mostrarExcluir () {
    app.innerHTML = `<h2>Tela de Exclusão do Usuário</h2>`
    const resposta = await fetch ("/listarusuarios")
    const dados = await resposta.json

    if (!dados.valido){
        app.innerHTML += `
        <p> ${dados.mensagem} </p>
        <button onclick = "botaoVoltar()">Voltar</button>`
        return
    }

}


async function enviarFormulario (event) {
    event.preventDefault()

    const nomecompleto = document.getElementById("nomecompleto").value
    const email = document.getElementById("email").value
    const cpf = document.getElementById("cpf").value
    const cep = document.getElementById("cep").value

    const resposta = await fetch("/salvarusuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nomecompleto, email, cpf, cep })
    })

    const dados = await resposta.json()
    document.getElementById("mensagem").innerHTML = dados.mensagem
}