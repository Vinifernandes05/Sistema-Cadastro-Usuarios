const supabase = require("../BANCODEDADOS/Conexao_supabase")

async function excluirusuario(cpf) {

    const cpfnormalizado = cpf.trim().replace(/\D/g, "")

    const { error } = await supabase
        .from("usuarios")
        .delete()
        .eq("cpf", cpfnormalizado)

    if (error) {
        return {
            valido: false,
            mensagem: error.message
        }
    }

    return {
        valido: true,
        mensagem: "Usuário excluído com sucesso."
    }
}

module.exports = excluirusuario