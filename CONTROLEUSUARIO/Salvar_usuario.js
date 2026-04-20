//Arquivo responsável pelo salvamento do cadastro do usuário no arquivo JSON, em formato de array de objetos.

const fs = require("fs");
const path = require("path");
const lerbanco = require("../BANCODEDADOS/Ler_banco"); // Importa a função "lerbanco()" da pasta "BANCODEDADOS", do arquivo "Ler_banco"
const buscarcep = require ("../BUSCARCEP/Buscar_cep"); // Importa a função "buscarcep()" da pasta "BUSCARCEP", do arquivo "Buscar_cep"

// Função para salvar o usuário em um arquivo JSON, e guardar os dados sem sobrescrever os dados antigos.
async function salvarusuario(usuario) { 
      const usuarios = lerbanco()
      const dadoscep = await buscarcep(usuario.cep)

      if (!dadoscep.valido) { // Se der erro, retorna a mensagem da função buscarcep()
            return dadoscep
      }

      usuario.rua = dadoscep.rua
      usuario.bairro = dadoscep.bairro
      usuario.cidade = dadoscep.cidade
      usuario.estado = dadoscep.estado

      usuarios.push (usuario); // Adiciona o usuario dentro da lista, do array usuarios, sem sobrescrever nem apagar os dados antigos.

      const caminho = path.join(__dirname, "../BANCODEDADOS/Dados_usuarios.json"); // "path.join" monta o caminho correto independente de onde rodar o servidor. "__dirname" sempre aponta para a pasta do arquivo atual.
      
      const dados = JSON.stringify(usuarios, null, 2); // Transforma o array "usuarios" em uma string JSON. Objeto → String. JS -> JSON.
      
      fs.writeFileSync (caminho, dados) // Escreve os dados e salva tudo no arquivo "Dados_usuarios.json".
      
      console.log("\nDados salvos com sucesso.")

      return {
            valido: true, 
            mensagem: "Usuário cadastrado com sucesso."
      }
}

module.exports = salvarusuario; // Exporta a função "salvarusuario".
