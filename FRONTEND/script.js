// Arquivo responsável pela criação da tela dinâmica da página, receber dados do usuário e enviar para a rota /salvarusuario, além de enviar mensagens para o front.

const app = document.getElementById("app") // Encontra a div com id "app" no HTML, para mostrar o conteúdo dinâmico dentro dela.
const menu = document.getElementById("menu") // Encontra a div com id "menu" no HTML, para mostrar o menu de opções dentro dela.

// Função para voltar para a tela inicial, limpando o conteúdo da div "app" e mostrando apenas o menu de opções.
function botaoVoltar() { 

    app.innerHTML = ""
}


// Função para mostrar a tela de cadastro do usuário. 
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
        .getElementById("formCadastro") // Encontra o formulário de cadastro no HTML.
        .addEventListener("submit", enviarFormulario) // Adiciona um evento de "submit" no formulário, para que quando o usuário clicar no botão "Cadastrar", a função "enviarFormulario" seja chamada e os dados sejam enviados para o backend.
}

// Função para mostrar a tela de listagem dos usuários.
async function mostrarLista () {

    app.innerHTML = `<h2>Tela de Listagem dos Usuários</h2>`
    
    const resposta = await fetch("/listarusuarios", {
        method: "GET",
        headers: {"Content-Type": "application/json"} // Quando é enviado dados no body em formato JSON.
    })

    const dados = await resposta.json() // Converte a resposta do backend, que é uma string JSON, em um objeto JS para facilitar o acesso aos dados.

    if (!dados.valido) {
        app.innerHTML += `<p> ${dados.mensagem} </p>`
        return
    }

    let lista = ""
    for (let i = 0; i < dados.dados.length; i++) {
        lista += `<div class="card-usuario"> 

                    <h2> Usuário ${i + 1} </h2>

                        <p> Nome Completo: ${dados.dados[i].nomecompleto} </p>
                        <p> Email: ${dados.dados[i].email} </p>
                        <p> CPF: ${formatarCPF(dados.dados[i].cpf)} </p>
                        <p> CEP: ${formatarCEP(dados.dados[i].cep)} </p>

                    <button type="button" class="btn-mostrardetalhes" onclick="botaoMostrarDetalhes(${i}, this)">Visualizar mais detalhes </button>
                    
                    <div id="detalhes${i}" style="display:none">

                        <p> Rua: ${dados.dados[i].rua} </p>
                        <p> Bairro: ${dados.dados[i].bairro} </p>
                        <p> Cidade: ${dados.dados[i].cidade} </p>
                        <p> Estado: ${dados.dados[i].estado} </p>

                    </div>

                  </div>`
    }
    app.innerHTML += lista
        app.innerHTML += `<button onclick="botaoVoltar()">Voltar</button>`
}

// Função para mostrar a tela de edição dos usuários.
async function mostrarEditar () {

    app.innerHTML = `<h2>Tela de Edição do Usuário</h2>`

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
        lista += `<div class="card-usuario"> 

                    <h2> Usuário ${i + 1} </h2>
                    <p> Nome Completo: ${dados.dados[i].nomecompleto} </p>
                    <p> Email: ${dados.dados[i].email} </p>
                    <p> CPF: ${formatarCPF(dados.dados[i].cpf)}</p>
                    <p> CEP: ${formatarCEP(dados.dados[i].cep)} </p>

                    <button type="button" class="btn-editar" onclick="botaoEditar(${i})">Editar usuário </button>

                  </div>`
    }
    app.innerHTML += lista
       app.innerHTML += `<button onclick="botaoVoltar()">Voltar</button>`
}


let cpfAtual = "" // Armazena o CPF original do usuário que está sendo editado no momento

// Função para mostrar a tela de edição do usuário.
async function botaoEditar (index) {

    const resposta = await fetch ("/listarusuarios", {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })

    const dados = await resposta.json()
    const usuario = dados.dados[index]

    cpfAtual = usuario.cpf // Guarda o CPF atual do usuário ao abrir o formulário

    app.innerHTML = `<h2> Edição do Usuário </h2>

                    <form id="formEditar">

                        <label> Nome Completo: </label>
                        <input type="text" id="nomecompleto" value="${usuario.nomecompleto}">

                        <label> Email: </label>
                        <input type="email" id="email" value="${usuario.email}">

                        <label> CPF: </label>
                        <input type="text" id="cpf" value="${formatarCPF(usuario.cpf)}">

                        <label> CEP: </label>
                        <input type="text" id="cep" value="${formatarCEP(usuario.cep)}">

                            <button type="button" onclick="mostrarEditar()">Voltar</button>
                            <button type="submit">Salvar Alterações</button>

                    </form> 

                <div id="mensagem" ></div>
    `
    
    document
    .getElementById("formEditar")
    .addEventListener("submit", function(event) {
        event.preventDefault()
        salvaralteracaoedicao()
    })
}


// Função para salvar as alterações feitas na edição do usuário.
async function salvaralteracaoedicao () {

    const nomecompleto = document.getElementById("nomecompleto").value
    const email = document.getElementById("email").value
    const cep = document.getElementById("cep").value.replace(/\D/g, "")
    const cpfNovoDigitado = document.getElementById("cpf").value.replace(/\D/g, "")

    const resposta = await fetch("/editarusuario", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify ({ cpfOriginal: cpfAtual, nomecompleto, email, cpf: cpfNovoDigitado, cep })
    })

    const dados = await resposta.json()

    document.getElementById("mensagem").innerHTML = dados.mensagem

    // Atualiza o cpfAtual para o novo CPF após salvamento bem-sucedido
    if (dados.valido) {
        cpfAtual = cpfNovoDigitado
    }
}

// Função para mostrar a tela de exclusão dos usuários.
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
        lista += `<div class ="card-usuario"> 
                    <h2> Usuário ${i + 1} </h2>
                    <p> Nome Completo: ${dados.dados[i].nomecompleto} </p>
                    <p> Email: ${dados.dados[i].email} </p>
                    <p> CPF: ${formatarCPF(dados.dados[i].cpf)} </p>
                    <p> CEP: ${formatarCEP(dados.dados[i].cep)} </p>
                    <button type="button" class="btn-excluir" onclick="botaoExcluir('${dados.dados[i].cpf}', '${dados.dados[i].nomecompleto}')">Excluir</button>
                  </div>`
    }

    app.innerHTML += lista
    app.innerHTML += `<button onclick="botaoVoltar()">Voltar</button>`
}


// Função para excluir o usuário, recebendo o CPF e o nome do usuário para confirmação da exclusão.
async function botaoExcluir (cpf, nomedousuario) {

    app.innerHTML = `
        <h2>Confirmação de Exclusão</h2>

        <div class="card-usuario">
            <h4>Tem certeza que deseja excluir o usuário abaixo?</h4>

            <p>Nome Completo: ${nomedousuario}</p>
            <p>CPF: ${formatarCPF(cpf)}</p>

            <button class="btn-excluir" onclick="confirmarExclusao('${cpf}')">
                Confirmar Exclusão
            </button>

            <button type="button" onclick="mostrarExcluir()">
                Cancelar
            </button>
        </div>
    `
}

// Função para enviar a requisição de exclusão do usuário para a rota "/excluirusuario" do backend, recebendo o CPF do usuário a ser excluído.
async function confirmarExclusao (cpf) {

    const resposta = await fetch("/excluirusuario", {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ cpf: cpf })
    })

    const dados = await resposta.json()

    if (!dados.valido) {
        app.innerHTML += `<p>${dados.mensagem}</p>`
        return
    }

    app.innerHTML = `
        <h2>Sucesso!</h2>
        <p>${dados.mensagem}</p>
        <button onclick="mostrarExcluir()">Voltar</button>
    `
}

// Função para mostrar ou ocultar os detalhes do usuário na tela de listagem, a partir do clique no botão "Visualizar mais detalhes".
function botaoMostrarDetalhes (index, botao) {

    const divDetalhes = document.getElementById(`detalhes${index}`)

        if (divDetalhes.style.display === "none") {

            divDetalhes.style.display = "block"
            botao.textContent = "Ocultar detalhes"

        } else {
            divDetalhes.style.display = "none"
            botao.textContent = "Visualizar mais detalhes"
        }
}


// Função para enviar os dados do formulário de cadastro do usuário para a rota "/salvarusuario" do backend.
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