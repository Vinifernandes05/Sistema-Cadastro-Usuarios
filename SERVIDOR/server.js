// Arquivo responsável pelo backend principal da aplicação, inicializa o servidor web com Express, serve os arquivos e recebe requisições do frontend, responde com JSON. 

const express = require("express")
const path = require("path")

const listarusuarios = require("../CONTROLEUSUARIO/Listar_usuarios")
const salvarusuarios = require("../CONTROLEUSUARIO/Salvar_usuarios")

const validarcep = require("../VALIDARCADASTRO/Validar_cep")
const validarcpf = require("../VALIDARCADASTRO/Validar_cpf")
const validaremail = require("../VALIDARCADASTRO/Validar_email")
const validarnome = require("../VALIDARCADASTRO/Validar_nomecompleto")


const servidorweb = express()

servidorweb.use(express.static(path.join(__dirname, "../FRONTEND")))
servidorweb.use(express.json())
servidorweb.use(express.urlencoded({ extended: true }))

servidorweb.get("/listarusuarios", function(pedido, resposta) {
    const arrayusuarios = listarusuarios()
    resposta.json(arrayusuarios)
})

servidorweb.post("/salvarusuarios", function(pedido, resposta) {

    const usuario = pedido.body
    console.log("Dados recebidos:", usuario) // Aparece no terminal

    const {nomecompleto, email, cpf, cep} = usuario

    const resultadoNome = validarnome(nomecompleto)
    if (!resultadoNome.valido) {
        return resposta.status(400).json(resultadoNome)
    }

    const resultadoEmailFormato = validaremail.emailincorreto(email)
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
})

servidorweb.listen(3000, function() {
    console.log("Servidor rodando na porta 3000.")
})