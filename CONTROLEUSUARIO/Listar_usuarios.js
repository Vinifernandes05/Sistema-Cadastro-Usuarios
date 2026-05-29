//Arquivo responsável pela listagem dos usuários, retornando os usuários encontrados em formato de índice ou uma mensagem de erro, caso nao encontre.

const supabase = require("../BANCODEDADOS/Conexao_supabase"); // Importa a função "lerbanco()", do arquivo "Ler_banco" e da pasta "BANCODEDADOS" para ler o banco de dados e obter o array de usuários cadastrados, para mostrar os dados dos usuários na listagem.

// Função para listar os usuários cadastrados, mostrando o Nome Completo, E-mail, Cidade e Estado.
async function listarusuarios () { 
   const usuarios = await supabase
      .from("usuarios")
      .select("*")
      .order("id", { ascending: true });
      const { data, error } = usuarios;

   if (error) { // Verifica se ocorreu um erro ao listar os usuários no banco de dados.
      return {
         valido: false, // Indica que a operação de listagem dos usuários não foi bem-sucedida.
         mensagem: "Erro ao listar usuários no banco de dados."
      };
   }

   if (data.length === 0) { // Verifica se a lista de usuários está vazia, ou seja, se não há nenhum usuário cadastrado no banco de dados.
      return {
         valido: false, // Indica que a operação de listagem dos usuários não foi bem-sucedida, pois não há usuários cadastrados no banco de dados.
         mensagem: "Nenhum usuário encontrado no banco de dados."
      };
   }

   return {
      valido: true, // Indica que a operação de listagem dos usuários foi bem-sucedida.
      dados: data
   }
}

module.exports = listarusuarios; // Exporta a função "listarusuarios()".
