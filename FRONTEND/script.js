

const app = document.getElementById("app") // Para pegar o "app" que está no HTML. "innerHTML" significa substituir tudo que está dentro do app por isso aqui.
const menu = document.getElementById("menu")

function botaoVoltar() {
app.innerHTML = "" // Faz com que o botão "Voltar" funcione corretamente. Ele limpa a área dinâmica.

}

function mostrarCadastro () {
app.innerHTML = `<h2>Tela de Cadastro de Usuário</h2>
                 <button onclick = "botaoVoltar()">Voltar</button>`
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

