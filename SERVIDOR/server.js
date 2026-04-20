// Arquivo responsável pelo backend principal da aplicação, inicializa o servidor web com Express, serve os arquivos e recebe requisições do frontend, responde com JSON. 

const express = require("express") // Importa "express", Framework que cria o servidor web.
const path = require("path") // Importa "path", Biblioteca para trabalhar com caminhos de pastas/arquivos.

const listarusuarios = require("../CONTROLEUSUARIO/Listar_usuarios")
const salvarusuario = require("../CONTROLEUSUARIO/Salvar_usuario")
const excluirusuario = require("../CONTROLEUSUARIO/Excluir_usuario")
const editarusuario  = require("../CONTROLEUSUARIO/Editar_dados_usuario")

const validarcep = require("../VALIDARCADASTRO/Validar_cep")
const validarcpf = require("../VALIDARCADASTRO/Validar_cpf")
const validaremail = require("../VALIDARCADASTRO/Validar_email")
const validarnome = require("../VALIDARCADASTRO/Validar_nomecompleto")

const PORT = process.env.PORT || 3000;
const servidorweb = express()

servidorweb.use(express.static(path.join(__dirname, "../FRONTEND")))
servidorweb.use(express.json())
servidorweb.use(express.urlencoded({ extended: true }))


servidorweb.get("/listarusuarios", function(pedido, resposta) { // 
    const arrayusuarios = listarusuarios()
    resposta.json(arrayusuarios)
})


servidorweb.post("/salvarusuario", async function(pedido, resposta) { // 
    const usuario = pedido.body
    console.log("Dados recebidos:", usuario) // Aparece no terminal

    const {nomecompleto, email, cpf, cep} = usuario // Extrai as propriedades de dentro do usuario

    usuario.nomecompleto = nomecompleto.trim().replace(/\s+/g, " ")

    const resultadoNome = validarnome(usuario.nomecompleto)
    if (!resultadoNome.valido) {
        return resposta.status(400).json(resultadoNome)
    }

    usuario.email = email.trim().toLowerCase()

    const resultadoEmailFormato = validaremail.emailincorreto(usuario.email)
    if (!resultadoEmailFormato.valido) {
        return resposta.status(400).json(resultadoEmailFormato)
    }

    const resultadoEmailRepetido = validaremail.emailrepetido(usuario.email)
    if(!resultadoEmailRepetido.valido) {
        return resposta.status(400).json(resultadoEmailRepetido)
    }

    const cpfnormalizado = cpf.trim()

    const resultadoCPFFormato = validarcpf.validarCPF(cpfnormalizado)
    if (!resultadoCPFFormato.valido) {
        return resposta.status(400).json(resultadoCPFFormato)
    }

    const resultadoCPFRepetido = validarcpf.cpfrepetido(cpfnormalizado)
    if (!resultadoCPFRepetido.valido) {
        return resposta.status(400).json(resultadoCPFRepetido)
    }

    usuario.cpf = cpfnormalizado.replace(/\D/g, "") 

    const cepnormalizado = cep.trim()

    const resultadoCEP = validarcep(cepnormalizado)
    if (!resultadoCEP.valido) {
        return resposta.status(400).json(resultadoCEP)
    }

    usuario.cep = cepnormalizado.replace(/\D/g, "") 

    const resultadoSalvar = await salvarusuario(usuario)
    if (!resultadoSalvar.valido) {
        return resposta.status(400).json(resultadoSalvar)
    }
    return resposta.status(201).json(resultadoSalvar)
})


servidorweb.put("/editarusuario", async function(pedido, resposta) { 
    const {cpfOriginal, nomecompleto, email, cpf, cep} = pedido.body
    
    const cpfAntigonormalizado = cpfOriginal.trim().replace(/\D/g, "")
    const cpfNovoDigitadonormalizado = cpf.trim().replace(/\D/g, "")
    const resultadoCPFRepetido = validarcpf.cpfrepetido(cpfNovoDigitadonormalizado)

    const cepnormalizado = cep.trim().replace(/\D/g, "")
    const nomenormalizado = nomecompleto.trim().replace(/\s+/g, " ")
    const emailnormalizado = email.trim().toLowerCase()

    if (cpfAntigonormalizado !== cpfNovoDigitadonormalizado) {
        if (!resultadoCPFRepetido.valido) {
            return resposta.status(400).json(resultadoCPFRepetido)
        }   
    }

    const resultadoNome = validarnome(nomenormalizado)
    if (!resultadoNome.valido) {
        return resposta.status(400).json(resultadoNome)
    }

    const resultadoEmailFormato = validaremail.emailincorreto(emailnormalizado)
    if (!resultadoEmailFormato.valido) {
        return resposta.status(400).json(resultadoEmailFormato)
    }

    // Verifica email repetido apenas se o email foi alterado em relação ao que está salvo no banco
    const usuariosdoBanco = listarusuarios()
    let emailAtualNoBanco = ""

    for (let i = 0; i < usuariosdoBanco.length; i++) {
        if (usuariosdoBanco[i].cpf === cpfAntigonormalizado) {
            emailAtualNoBanco = usuariosdoBanco[i].email
            break
        }
    }

    if (emailAtualNoBanco !== emailnormalizado) {
        const resultadoEmailRepetido = validaremail.emailrepetido(emailnormalizado)
        if (!resultadoEmailRepetido.valido) {
            return resposta.status(400).json(resultadoEmailRepetido)
        }
    }

    const resultadoCPFFormato = validarcpf.validarCPF(cpfNovoDigitadonormalizado)
    if (!resultadoCPFFormato.valido) {
        return resposta.status(400).json(resultadoCPFFormato)
    }

    const resultadoCEP = validarcep(cepnormalizado)
    if (!resultadoCEP.valido) {
        return resposta.status(400).json(resultadoCEP)
    }

    // Cria novo objeto "usuario" com os dados editados, para passar para a função de edição.
    const usuario = {
        cpfOriginal: cpfAntigonormalizado,
        nomecompleto: nomenormalizado,
        email: emailnormalizado,
        cpf: cpfNovoDigitadonormalizado,
        cep: cepnormalizado
    }

    // Chama a função de edição, passando o objeto "usuario" com os dados editados.
    const resultadoEditar = await editarusuario(usuario)

    if (!resultadoEditar.valido) {
        return resposta.status(400).json(resultadoEditar)
    }

    return resposta.status(200).json(resultadoEditar)
})


servidorweb.delete("/excluirusuario", function (pedido, resposta) { //
    const cpf = pedido.body.cpf

    const resultado = excluirusuario(cpf)
    if (!resultado.valido) {
        return resposta.status(400).json(resultado)
    }

    return resposta.status(200).json(resultado)
    }
)


servidorweb.listen(PORT, function() {
    console.log("Servidor rodando na porta " + PORT)
})