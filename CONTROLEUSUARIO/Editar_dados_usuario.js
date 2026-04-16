// Arquivo responsável pela edição dos dados do usuário.

const fs = require("fs")
const path = require("path")
const buscarcep = require("../BUSCARCEP/Buscar_cep")

async function editarusuario (usuario) {
   const caminho = path.join(__dirname, "../BANCODEDADOS/Dados_usuarios.json")
   const dados = fs.readFileSync(caminho, "utf-8")
   const usuarios = JSON.parse(dados)
   const cpfOriginal = usuario.cpfOriginal.replace(/\D/g, "")
   const cpfNovo = usuario.cpf.replace(/\D/g, "")

   let index = -1

   for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].cpf === cpfOriginal) { // CPF de cada usuário do banco = CPF que veio do frontend (que o usuário quer editar)
        index = i
        break
      }
   }

   if (index === -1) {
        return {
            valido: false,
            mensagem: "Usuário não encontrado"
        }
    }


    // Atualizar/substituir os dados do usuário
    usuarios[index].nomecompleto = usuario.nomecompleto
    usuarios[index].email = usuario.email
    usuarios[index].cpf = cpfNovo
    usuarios[index].cep = usuario.cep

    const dadoscep = await buscarcep(usuario.cep) // Atualizar/substituir endereço via CEP

    if (!dadoscep.valido) {
        return dadoscep
    }

    usuarios[index].rua = dadoscep.rua
    usuarios[index].bairro = dadoscep.bairro
    usuarios[index].cidade = dadoscep.cidade
    usuarios[index].estado = dadoscep.estado

    // Salvar arquivo
    fs.writeFileSync(caminho, JSON.stringify(usuarios, null, 2))

    return {
        valido: true,
        mensagem: "Usuário atualizado com sucesso"
    }
}

module.exports =  editarusuario