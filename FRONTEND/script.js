// Tela dinâmica para a página; Receber dados do usuário, e enviar para a rota /salvarusuario

const app = document.getElementById("app") // Para pegar o "app" que está no HTML. "innerHTML" significa substituir tudo que está dentro do app por isso aqui.
const menu = document.getElementById("menu")

function botaoVoltar() { 
app.innerHTML = "" // Faz com que o botão "Voltar" funcione corretamente. Ele limpa a área dinâmica.

}

function mostrarCadastro () {
    console.log("Botão clicado")
app.innerHTML = `<h2>Tela de Cadastro de Usuário</h2>
                
                <form action="/salvarusuarios" method="POST">
    
    Nome Completo: <input type="text" name="nome"><br><br>
    Email: <input type="email" name="email"><br><br>
    CPF: <input type="text" name="cpf"><br><br>
    CEP: <input type="text" name="cep"><br><br>

    <button type="button" onclick="botaoVoltar()">Voltar</button>
    <button type="submit">Cadastrar</button>

</form>
                 <div id="mensagem" ></div>
`

document 
        .getElementById("formCadastro")
        .addEventListener("submit", enviarFormulario)
       
                 
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

async function enviarFormulario (event) { // Colocamos "(event)" porque o submit gera um evento. É necessário para impedir o recarregamento.
    event.preventDefault() // Impede o comportamento padrão do formulário.

// Pega os dados que o usuário digitou.
 const nomecompleto = document.getElementById("nomecompleto").value
 const email = document.getElementById("email").value
 const cpf = document.getElementById("cpf").value
 const cep = document.getElementById("cep").value

 const resposta = await fetch("http://localhost:3000/salvarusuarios", {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        nomecompleto,
        email,
        cpf,
        cep
    })
 })

 const dados = await resposta.json() // Transforma a repsosta em objeto JSON
 document.getElementById("mensagem").innerHTML = dados.mensagem


}

