//Arquivo responsável pela listagem dos usuários, retornando os usuários encontrados em formato de índice ou uma mensagem de erro, caso nao encontre.

const lerbanco = require("../BANCODEDADOS/Ler_banco"); // Importa a função "lerbanco()", do arquivo "Ler_banco" e da pasta "BANCODEDADOS".

// Função para listar os usuários cadastrados, mostrando o nome completo, email, cidade e estado.
function listarusuarios () { 
   const usuarios = lerbanco();

      if (usuarios.length === 0) { // Verifica se o array está vazio, ou seja, se existe conteudo dentro do array. Essa é a forma certa de verificar se esta vazio ou não.
         return {
            valido: false,
            mensagem: "Nennhum usuário cadastrado."
         }
      }
            return {
               valido: true,
               dados: usuarios
            } 
} 

module.exports = listarusuarios; 
