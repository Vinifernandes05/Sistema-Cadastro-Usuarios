//Arquivo responsável pelo salvamento do cadastro do usuário no arquivo JSON, em formato de array de objetos.

const fs = require("fs");
const path = require("path");
const lerbanco = require("../BANCODEDADOS/Ler_banco"); // Importa a função "lerbanco()" da pasta "BANCODEDADOS", do arquivo "Ler_banco" para ler o banco de dados e obter o array de usuários cadastrados, para adicionar o novo usuário sem sobrescrever os dados antigos.
const buscarcep = require ("../BUSCARCEP/Buscar_cep"); // Importa a função "buscarcep()" da pasta "BUSCARCEP", do arquivo "Buscar_cep" para buscar o endereço completo do usuário, a partir do CEP que ele digitou, e salvar o endereço completo no banco de dados.

// Função para salvar o cadastro do usuário no arquivo JSON, em formato de array de objetos.
async function salvarusuario(usuario) { 
      const usuarios = lerbanco()
      const dadoscep = await buscarcep(usuario.cep)

      if (!dadoscep.valido) { // Verifica se o CEP é válido, ou seja, se a função "buscarcep()" retornou os dados do CEP corretamente. Se não for válido, retorna a mensagem de erro para o frontend.
            return dadoscep
      }
      
      usuario.rua = dadoscep.rua 
      usuario.bairro = dadoscep.bairro
      usuario.cidade = dadoscep.cidade
      usuario.estado = dadoscep.estado

      usuarios.push (usuario); // Adiciona o usuario dentro da lista, do array usuarios, sem sobrescrever nem apagar os dados antigos.

      const caminho = path.join(__dirname, "../BANCODEDADOS/Dados_usuarios.json"); 
      
      const dados = JSON.stringify(usuarios, null, 2); // Converte o array "usuarios" em uma string JSON.
      
      fs.writeFileSync (caminho, dados) // Salva a string JSON no arquivo "Dados_usuarios.json", sobrescrevendo o arquivo com os novos dados.
      
      console.log("\nDados salvos com sucesso.")

      return {
            valido: true, 
            mensagem: "Usuário cadastrado com sucesso."
      }
}

module.exports = salvarusuario; // Exporta a função "salvarusuario".
