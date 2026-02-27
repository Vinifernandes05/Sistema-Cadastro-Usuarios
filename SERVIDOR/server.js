// http://localhost:3000
const express = require("express")
const path = require("path");

const listarusuarios = require("../CONTROLEUSUARIO/Listar_usuarios");
const salvarusuarios = require("../CONTROLEUSUARIO/Salvar_usuarios");

const validarcep = require("../VALIDARCADASTRO/Validar_cep");
const validarcpf = require("../VALIDARCADASTRO/Validar_cpf");
const validaremail = require("../VALIDARCADASTRO/Validar_email");
const validarnome = require("../VALIDARCADASTRO/Validar_nomecompleto");


const servidorweb = express() 
servidorweb.use(express.static(path.join(__dirname, "../FRONTEND"))) // "use" é para usar como regra no servidor. "express.static" é para quando pedir o arquivo, entregar de uma pasta.
servidorweb.use(express.static(path.join(__dirname, "../CONTROLEUSUARIO")))
servidorweb.use(express.json())

servidorweb.get("/listarusuarios", function(pedido, resposta) { // Criação da rota. "get" é para listar, nesse caso, listar os usuários.
    const arrayusuarios = listarusuarios()
    resposta.json(arrayusuarios);
});


servidorweb.post("/salvarusuarios", function(pedido, resposta) { // "post" é para salvar no sistema, cadastrar usuário.
    const usuario = pedido.body // 
    const {nomecompleto, email, cpf, cep, rua, bairro, cidade, estado} = usuario

    const resultadoNome = validarnome(nomecompleto)
        if (!resultadoNome.valido) { // usa".valido" pelo fato das funções retornarem objetos, e não true or false.
            return resposta.status(400).json(resultadoNome) // "return" faz para tudo. "resposta" é o objeto de reposta do Express (response), ".status(400)" define o código HTTPS da resposta, no caso, requisição inválida. ".json" envia um JSON como resposta.
        }

    const resultadoEmailFormato = validaremail.emailincorreto(email) // Adiciona a função ao lado "validaremail.emailincorreto(email)" pelo fato do arquivo exportar duas funções, e "validaremail" vem com as 2 funções juntas.
        if (!resultadoEmailFormato.valido) {
            return resposta.status(400).json(resultadoEmailFormato)
        }

    const resultadoEmailRepetido = validaremail.emailrepetido(email) 
        if(!resultadoEmailRepetido.valido) {
            return resposta.status(400).json(resultadoEmailRepetido)
        }

    const resultadoCPF = validarcpf(cpf)
        if (!resultadoCPF.valido) {
            return resposta.status(400).json(resultadoCPF)
        }

    const resultadoCEP = validarcep(cep)
    if (!resultadoCEP.valido) {
        return resposta.status(400).json(resultadoCEP)
    }

    salvarusuarios(usuario)
    return resposta.status(201).json({ mensagem: "Usuário Cadastrado com Sucesso!" })
    
});


servidorweb.listen (3000, function() { // .listen() é o botão de ligar o servidor
    console.log("Servidor rodando na porta 3000.");
});
