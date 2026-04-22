//Arquivo responsável pela listagem dos usuários, retornando os usuários encontrados em formato de índice ou uma mensagem de erro, caso nao encontre.

const lerbanco = require("../BANCODEDADOS/Ler_banco"); // Importa a função "lerbanco()", do arquivo "Ler_banco" e da pasta "BANCODEDADOS" para ler o banco de dados e obter o array de usuários cadastrados, para mostrar os dados dos usuários na listagem.

// Função para listar os usuários cadastrados, mostrando o Nome Completo, E-mail, Cidade e Estado.
function listarusuarios () { 
   const usuarios = lerbanco();

      if (usuarios.length === 0) { // Verifica se o array de usuários está vazio, ou seja, se não há nenhum usuário cadastrado.
         return {
            valido: false,
            mensagem: "Nenhum usuário cadastrado."
         }
      }
            return {
               valido: true,
               dados: usuarios
            } 
} 

module.exports = listarusuarios; // Exporta a função "listarusuarios()".
