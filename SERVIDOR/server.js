// Arquivo responsável pelo backend principal da aplicação, inicializa o servidor web com Express, serve os arquivos e recebe requisições do frontend, responde com JSON. 

const express = require("express") 
const path = require("path") 

const listarusuarios = require("../CONTROLEUSUARIO/Listar_usuarios") // Importa a função "listarusuarios()" da pasta "CONTROLEUSUARIO", do arquivo "Listar_usuarios" para listar os usuários cadastrados, mostrando o Nome Completo, E-mail, Cidade e Estado.
const salvarusuario = require("../CONTROLEUSUARIO/Salvar_usuario") // Importa a função "salvarusuario()" da pasta "CONTROLEUSUARIO", do arquivo "Salvar_usuario" para salvar o cadastro do usuário no arquivo JSON, em formato de array de objetos.
const excluirusuario = require("../CONTROLEUSUARIO/Excluir_usuario") // Importa a função "excluirusuario()" da pasta "CONTROLEUSUARIO", do arquivo "Excluir_usuario" para excluir o usuário do arquivo JSON, a partir do CPF.
const editarusuario  = require("../CONTROLEUSUARIO/Editar_dados_usuario") // Importa a função "editarusuario()" da pasta "CONTROLEUSUARIO", do arquivo "Editar_dados_usuario" para editar os dados do usuário no arquivo JSON, a partir do CPF.

const validarcep = require("../VALIDARCADASTRO/Validar_cep") // Importa a função "validarcep()" da pasta "VALIDARCADASTRO", do arquivo "Validar_cep" para validar o CEP digitado pelo usuário, verificando se o formato está correto e se o CEP existe, antes de salvar ou editar os dados do usuário.
const validarcpf = require("../VALIDARCADASTRO/Validar_cpf") // Importa a função "validarcpf()" da pasta "VALIDARCADASTRO", do arquivo "Validar_cpf" para validar o CPF digitado pelo usuário, verificando se o formato está correto, se é um CPF válido e se já existe no banco de dados, antes de salvar ou editar os dados do usuário.
const validaremail = require("../VALIDARCADASTRO/Validar_email") // Importa a função "validaremail()" da pasta "VALIDARCADASTRO", do arquivo "Validar_email" para validar o E-mail digitado pelo usuário, verificando se o formato está correto e se já existe no banco de dados, antes de salvar ou editar os dados do usuário.
const validarnome = require("../VALIDARCADASTRO/Validar_nomecompleto") // Importa a função "validarnome()" da pasta "VALIDARCADASTRO", do arquivo "Validar_nomecompleto" para validar o Nome Completo digitado pelo usuário, verificando se o formato está correto, antes de salvar ou editar os dados do usuário.

const PORT = process.env.PORT || 3000; 
const servidorweb = express() 

servidorweb.use(express.static(path.join(__dirname, "../FRONTEND")))
servidorweb.use(express.json())
servidorweb.use(express.urlencoded({ extended: true }))


// Rota para listar os usuários cadastrados, mostrando o Nome Completo, E-mail, Cidade e Estado.
servidorweb.get("/listarusuarios", async function(pedido, resposta) { // 
    const arrayusuarios = await listarusuarios()
    resposta.json(arrayusuarios)
})


// Rota para salvar o cadastro do usuário, recebe os dados do usuário do frontend, valida os dados, chama a função de salvamento e retorna o resultado.
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

    const cpfnormalizado = cpf.trim().replace(/\D/g, "")

    const resultadoCPFFormato = validarcpf.validarCPF(cpfnormalizado)
    if (!resultadoCPFFormato.valido) {
        return resposta.status(400).json(resultadoCPFFormato)
    }

    const resultadoCPFRepetido = validarcpf.cpfrepetido(cpfnormalizado)
    if (!resultadoCPFRepetido.valido) {
        return resposta.status(400).json(resultadoCPFRepetido)
    }

    usuario.cpf = cpfnormalizado.replace(/\D/g, "") 

    const cepnormalizado = cep.trim().replace(/\D/g, "")

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


// Rota para editar os dados do usuário, recebe os dados do usuário editados do frontend, valida os dados, chama a função de edição e retorna o resultado.
servidorweb.put("/editarusuario", async function(pedido, resposta) { 
    const {cpfOriginal, nomecompleto, email, cpf, cep} = pedido.body
    
    const cpfAntigonormalizado = cpfOriginal.trim().replace(/\D/g, "")
    const cpfNovoDigitadonormalizado = cpf.trim().replace(/\D/g, "")

    const cepnormalizado = cep.trim().replace(/\D/g, "")
    const nomenormalizado = nomecompleto.trim().replace(/\s+/g, " ")
    const emailnormalizado = email.trim().toLowerCase()

    const resultadoNome = validarnome(nomenormalizado)
    if (!resultadoNome.valido) {
        return resposta.status(400).json(resultadoNome)
    }

    const resultadoEmailFormato = validaremail.emailincorreto(emailnormalizado)
    if (!resultadoEmailFormato.valido) {
        return resposta.status(400).json(resultadoEmailFormato)
    }

    const resultadoCPFFormato = validarcpf.validarCPF(cpfNovoDigitadonormalizado)
    if (!resultadoCPFFormato.valido) {
        return resposta.status(400).json(resultadoCPFFormato)
    }

    const resultadoCEP = validarcep(cepnormalizado)
    if (!resultadoCEP.valido) {
        return resposta.status(400).json(resultadoCEP)
    }

    // Confere se existe usuário no banco.
    const resultadoLista = listarusuarios()
    if (!resultadoLista.valido) {
        return resposta.status(400).json(resultadoLista)
    }

    // Busca os dados atuais do usuário no banco para comparações.
    const usuariosdoBanco = resultadoLista.dados
    let emailAtualNoBanco = ""
    let cpfAtualNoBanco = ""

    for (let i = 0; i < usuariosdoBanco.length; i++) {
        if (usuariosdoBanco[i].cpf === cpfAntigonormalizado) {
            emailAtualNoBanco = usuariosdoBanco[i].email
            cpfAtualNoBanco = usuariosdoBanco[i].cpf
            break
        }
    }

    // Verifica email duplicado somente se o email foi alterado, ignorando o próprio usuário
    if (emailAtualNoBanco !== emailnormalizado) {
        const resultadoEmailRepetido = validaremail.emailrepetido(
            emailnormalizado,
            cpfAntigonormalizado
        )
        if (!resultadoEmailRepetido.valido) {
            return resposta.status(400).json(resultadoEmailRepetido)
        }
    }

    // Verifica CPF duplicado somente se o CPF foi alterado, ignorando o próprio usuário
    if (cpfAtualNoBanco !== cpfNovoDigitadonormalizado) {
        const resultadoCPFRepetido = validarcpf.cpfrepetido(
            cpfNovoDigitadonormalizado,
            cpfAntigonormalizado
        )
        if (!resultadoCPFRepetido.valido) {
            return resposta.status(400).json(resultadoCPFRepetido)
        }
    }

    // Cria novo objeto "usuario" com os dados editados
    const usuario = {
        cpfOriginal: cpfAntigonormalizado,
        nomecompleto: nomenormalizado,
        email: emailnormalizado,
        cpf: cpfNovoDigitadonormalizado,
        cep: cepnormalizado
    }

    const resultadoEditar = await editarusuario(usuario)

    if (!resultadoEditar.valido) {
        return resposta.status(400).json(resultadoEditar)
    }

    return resposta.status(200).json(resultadoEditar)
})


// Rota para exclusão do usuário, recebe o CPF do usuário a ser excluído, chama a função de exclusão e retorna o resultado.
servidorweb.delete("/excluirusuario", function (pedido, resposta) { //
    const cpf = pedido.body.cpf

    const resultado = excluirusuario(cpf)
    if (!resultado.valido) {
        return resposta.status(400).json(resultado)
    }

    return resposta.status(200).json(resultado)
    }
)


// Inicia o servidor web na porta definida, exibindo uma mensagem no console para confirmar que o servidor está rodando.
servidorweb.listen(PORT, function() {
    console.log("Servidor rodando na porta " + PORT)
})