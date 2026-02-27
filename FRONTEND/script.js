// Tela dinâmica para a página

const app = document.getElementById("app") // Para pegar o "app" que está no HTML. "innerHTML" significa substituir tudo que está dentro do app por isso aqui.
const menu = document.getElementById("menu")

function botaoVoltar() { 
app.innerHTML = "" // Faz com que o botão "Voltar" funcione corretamente. Ele limpa a área dinâmica.

}

function mostrarCadastro () {
app.innerHTML = `<h2>Tela de Cadastro de Usuário</h2>
                 <br><br>

                 <label> Nome: </label>
                 <input type="text" id="nome"><br>

                 <label> Email: </label>
                 <input type="email" id="email"><br>

                 <label> CPF: </label>
                 <input type="maxlenght= 11" id="cpf"><br>

                 <label> CEP: </label>
                 <input type="maxlenght= 8" id="cep"><br>
                                                 
                 <button onclick = "botaoVoltar()">Voltar</button> 
                 <button>Cadastrar</button>
`
                 
}

function mostrarLista () {
app.innerHTML = `<h2>Tela de Listagem dos Usuários</h2>
                 <button onclick = "botaoVoltar()">Voltar</button>`

}

function mostrarEditar () {
app.innerHTML = `<h2>Tela de Edição do Usuário</h2>
                 <button onclick = "botaoVoltar()">Voltar</button>`

}

function mostrarExcluir () {
app.innerHTML = `<h2>Tela de Exclusão do Usuário</h2> 
                 <button onclick = "botaoVoltar()">Voltar</button>`

}

