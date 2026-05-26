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
        .select()

    if (error) {

        console.log("ERRO SUPABASE:", error)

        return {
            valido: false,
            mensagem: error.message
        }
    }

    console.log("USUÁRIO SALVO:", data)

    return {
        valido: true,
        dados: data,
        mensagem: "Usuário salvo com sucesso no banco de dados."
    }
}

module.exports = salvarusuario