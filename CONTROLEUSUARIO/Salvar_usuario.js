const supabase = require("../BANCODEDADOS/Conexao_supabase")

async function salvarusuario(usuario) { 

      const { data, error } = await supabase
      .from("usuarios")
      .insert([
            {
                  nomecompleto: usuario.nomecompleto,
                  email: usuario.email,
                  cpf: usuario.cpf,
                  cep: usuario.cep
            }
      ])
      .select();

      console.log("DATA:", data)
      console.log("ERROR:", error)

      if (error) {
            return {
                  valido: false,
                  mensagem: error.message
            };
      }

      return {
            valido: true,
            dados: data,
            mensagem: "Usuário salvo com sucesso no banco de dados."
      }
}

module.exports = salvarusuario;