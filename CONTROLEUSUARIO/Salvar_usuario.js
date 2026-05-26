//Arquivo responsável pelo salvamento do cadastro do usuário no arquivo JSON, em formato de array de objetos.

const supabase = require("../BANCODEDADOS/Conexao_supabase")

// Função para salvar o cadastro do usuário no arquivo JSON, em formato de array de objetos.
async function salvarusuario(usuario) { 

      const { data, error } = await supabase 
      .from("usuarios")
      .insert([{
            nomecompleto: usuario.nomecompleto,
            email: usuario.email,
            cpf: usuario.cpf,
            cep: usuario.cep,
      }]);

      if (error) {
            return {
                  valido: false,
                  mensagem: "Erro ao salvar usuário no banco de dados."
            };
      }

      return {
            valido: true,
            dados: data,
            mensagem: "Usuário salvo com sucesso no banco de dados."
            
      }
}

module.exports = salvarusuario; // Exporta a função "salvarusuario".
