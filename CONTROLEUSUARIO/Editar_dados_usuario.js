// Arquivo responsável pela edição dos dados do usuário.

const fs = require("fs") 
const path = require("path")
const buscarcep = require("../BUSCARCEP/Buscar_cep") // Importa a função "buscarcep()", do arquivo "Buscar_cep" e da pasta "BUSCARCEP" para buscar os dados do CEP atualizado do usuário, para atualizar o endereço completo do usuário no banco de dados.

// Função para editar os dados do usuário, recebendo o objeto com os dados atualizados do frontend, verificando se houve alterações e salvando os novos dados no banco de dados.
async function editarusuario (usuario) {
   const caminho = path.join(__dirname, "../BANCODEDADOS/Dados_usuarios.json")
   const dados = fs.readFileSync(caminho, "utf-8")
   const usuarios = JSON.parse(dados)
   const cpfAntigonormalizado = usuario.cpfOriginal // CPF que veio do frontend (que o usuário selecionou e quer editar), já normalizado no server.js.
   const cpfNovoDigitadonormalizado = usuario.cpf // CPF que veio do frontend (que o usuário digitou no campo CPF), já normalizado no server.js.

   let index = -1 

   for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].cpf === cpfAntigonormalizado) { // CPF de cada usuário do banco = CPF que veio do frontend (que o usuário selecionou e quer editar)
        index = i // Se realmente é, guarda a posição do usuário
        break
      }
   }

    const usuarioAtual = usuarios[index] // Dados atuais do usuário no banco, para comparação com os dados que vieram do frontend.

    console.log("=== COMPARAÇÃO ===")
    console.log("Nome banco:  |" + usuarioAtual.nomecompleto + "|")
    console.log("Nome novo:   |" + usuario.nomecompleto + "|")
    console.log("Email banco: |" + usuarioAtual.email + "|")
    console.log("Email novo:  |" + usuario.email + "|")
    console.log("CPF banco:   |" + usuarioAtual.cpf + "|")
    console.log("CPF novo:    |" + cpfNovoDigitadonormalizado + "|")
    console.log("CEP banco:   |" + usuarioAtual.cep + "|")
    console.log("CEP novo:    |" + usuario.cep + "|")
    console.log("==================")
    
    const nenhumaAlteracao = // Compara os dados atuais do usuário no banco com os dados que vieram do frontend.
        usuarioAtual.nomecompleto === usuario.nomecompleto &&
        usuarioAtual.email        === usuario.email        &&
        usuarioAtual.cpf          === cpfNovoDigitadonormalizado &&
        usuarioAtual.cep          === usuario.cep

    if (nenhumaAlteracao) {
        return {
            valido: false,
            mensagem: "Necessário alterar algum dado para Salvar Alterações"
        }
    }

    // Atualiza os dados do usuário no array "usuarios" com os dados que vieram do frontend.
    usuarios[index].nomecompleto = usuario.nomecompleto
    usuarios[index].email = usuario.email
    usuarios[index].cpf = cpfNovoDigitadonormalizado
    usuarios[index].cep = usuario.cep

    const dadoscep = await buscarcep(usuario.cep) // Busca os dados do CEP atualizado do usuário, para atualizar o endereço completo do usuário no banco de dados.

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

module.exports = editarusuario // Exporta a função "editarusuario()".