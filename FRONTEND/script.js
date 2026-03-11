// Arquivo responsável pela criação da tela dinâmica da página, receber dados do usuário e enviar para a rota /salvarusuario, além de enviar mensagens para o front.

const app = document.getElementById("app")
const menu = document.getElementById("menu")

function botaoVoltar() { 
    app.innerHTML = ""
}

function mostrarCadastro () {
    app.innerHTML = `
    <h2>Tela de Cadastro de Usuário</h2>
                
    <form id="formCadastro">
        <label>Nome Completo:</label>
        <input type="text" id="nomecompleto" placeholder="Campo Obrigatório">

        <label>Email:</label>
        <input type="email" id="email" placeholder="Campo Obrigatório">

        <label>CPF:</label>
        <input type="text" id="cpf" placeholder="Campo Obrigatório">

        <label>CEP:</label>
        <input type="text" id="cep" placeholder="Campo Obrigatório">

        <button type="button" onclick="botaoVoltar()">Voltar</button>
        <button type="submit">Cadastrar</button>
    </form>

    <div id="mensagem"></div>
    `

    document
        .getElementById("formCadastro") // Encontra o formulário no HTML.
        .addEventListener("submit", enviarFormulario) // Quando enviado, chama a função "enviarFormulario".
}


async function mostrarLista () {
    app.innerHTML = `<h2>Tela de Listagem dos Usuários</h2>`
    
    const resposta = await fetch("/listarusuarios", {
        method: "GET",
        headers: {"Content-Type": "application/json"} // Quando é enviado dados no body em formato JSON.
    })

    const dados = await resposta.json()

    if (!dados.valido) {
        app.innerHTML += `<p> ${dados.mensagem} </p>`
        return
    }

    let lista = ""
    for (let i = 0; i < dados.dados.length; i++) {
        lista += `<form> 
                    <h2> Usuário ${i + 1} </h2>
                    <p> Nome Completo: ${dados.dados[i].nomecompleto} </p>
                    <p> Email: ${dados.dados[i].email} </p>
                    <p> CPF: ${dados.dados[i].cpf} </p>
                    <p> CEP: ${dados.dados[i].cep} </p>
                  </form>`
    }
    app.innerHTML += lista
        app.innerHTML += `<button onclick="botaoVoltar()">Voltar</button>`
}


async function mostrarEditar () {
    app.innerHTML = `
    <h2>Tela de Edição do Usuário</h2>`

    const resposta = await fetch ("/listarusuarios", {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })

    const dados = await resposta.json()
    

  if (!dados.valido) {
        app.innerHTML += `<p> ${dados.mensagem} </p>`
        return
    }

    let lista = ""
    for (let i = 0; i < dados.dados.length; i++) {
        lista += `<form> 
                    <h2> Usuário ${i + 1} </h2>
                    <p> Nome Completo: ${dados.dados[i].nomecompleto} </p>
                    <p> Email: ${dados.dados[i].email} </p>
                    <p> CPF: ${dados.dados[i].cpf} </p>
                    <p> CEP: ${dados.dados[i].cep} </p>
                  </form>`
    }
    app.innerHTML += lista
        app.innerHTML += `<button onclick="botaoVoltar()">Voltar</button>`
}


async function mostrarExcluir () {
    app.innerHTML = `<h2>Tela de Exclusão do Usuário</h2>`

    const resposta = await fetch("/listarusuarios", {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })

    const dados = await resposta.json()

    if (!dados.valido) {
        app.innerHTML += `<p> ${dados.mensagem} </p>`
        return
    }

    let lista = ""
    for (let i = 0; i < dados.dados.length; i++) {
        lista += `<form> 
                    <h2> Usuário ${i + 1} </h2>
                    <p> Nome Completo: ${dados.dados[i].nomecompleto} </p>
                    <p> Email: ${dados.dados[i].email} </p>
                    <p> CPF: ${dados.dados[i].cpf} </p>
                    <p> CEP: ${dados.dados[i].cep} </p>
                    <button type="button" class="btn-excluir" onclick="botaoExcluir('${dados.dados[i].cpf}')">Excluir</button>
                  </form>`
    }

    app.innerHTML += lista
    app.innerHTML += `<button onclick="botaoVoltar()">Voltar</button>`

}


 async function botaoExcluir (cpf) {
        const resposta = await fetch ("/excluirusuario", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify ({cpf: cpf})
     }
     )

     const dados = await resposta.json()

     if(!dados.valido) {
        app.innerHTML += `<p> ${dados.mensagem} </p>`
        return
     }

    alert(dados.mensagem)
    mostrarExcluir() 
}


async function enviarFormulario (event) {
    event.preventDefault() // Impede o recarregamento de página no HTML, para que o JS asssuma o controle.

    const nomecompleto = document.getElementById("nomecompleto").value
    const email = document.getElementById("email").value
    const cpf = document.getElementById("cpf").value
    const cep = document.getElementById("cep").value

    const resposta = await fetch("/salvarusuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify ({ nomecompleto, email, cpf, cep })
    })

    const dados = await resposta.json()
    document.getElementById("mensagem").innerHTML = dados.mensagem
}

