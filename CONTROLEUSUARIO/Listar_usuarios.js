const lerbanco = require("../BANCODEDADOS/Ler_banco"); // Importa a função "lerbanco()" da pasta "BANCODEDADOS", do arquivo "Ler_banco"

function listarusuarios () { // Função para listar os usuários cadastrados, mostrando o nome completo, email, cidade e estado.
   const usuarios = lerbanco();

      if (usuarios.length === 0) { // Verifica se o array está vazio, ou seja, se existe conteudo dentro do array. Essa é a forma certe de verificar se esta vazio ou não.
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
