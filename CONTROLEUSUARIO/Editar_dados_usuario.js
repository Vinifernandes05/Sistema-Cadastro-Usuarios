const supabase = require("../BANCODEDADOS/Conexao_supabase")
const buscarcep = require("../BUSCARCEP/Buscar_cep")

async function editarusuario(usuario) {

    const dadoscep = await buscarcep(usuario.cep)

    if (!dadoscep.valido) {
        return dadoscep
    }

    const { error } = await supabase
        .from("usuarios")
        .update({
            nomecompleto: usuario.nomecompleto,
            email: usuario.email,
            cpf: usuario.cpf,
            cep: usuario.cep,
            rua: dadoscep.rua,
            bairro: dadoscep.bairro,
            cidade: dadoscep.cidade,
            estado: dadoscep.estado
        })
        .eq("cpf", usuario.cpfOriginal)

    if (error) {
        return {
            valido: false,
            mensagem: error.message
        }
    }

    return {
        valido: true,
        mensagem: "Usuário atualizado com sucesso!"
    }
}

module.exports = editarusuario