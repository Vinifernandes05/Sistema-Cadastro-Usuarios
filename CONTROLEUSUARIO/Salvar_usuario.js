const supabase = require("../BANCODEDADOS/Conexao_supabase")
const buscarcep = require("../BUSCARCEP/Buscar_cep")

async function salvarusuario(usuario) {

    const dadoscep = await buscarcep(usuario.cep)
    
    // Verifica se os dados do CEP são válidos, quando for salvar um novo usuário.
    if (!dadoscep.valido) {
        return dadoscep
    }

    const { data, error } = await supabase
        .from("usuarios")
        .insert([
            {
                nomecompleto: usuario.nomecompleto,
                email: usuario.email,
                cpf: usuario.cpf,
                cep: usuario.cep,
                rua: dadoscep.rua,
                bairro: dadoscep.bairro,
                cidade: dadoscep.cidade,
                estado: dadoscep.estado
            }
        ])
        .select()

    if (error) {
        return {
            valido: false,
            mensagem: error.message
        }
    }

    return {
        valido: true,
        dados: data,
        mensagem: "Usuário salvo com sucesso."
    }
}

module.exports = salvarusuario