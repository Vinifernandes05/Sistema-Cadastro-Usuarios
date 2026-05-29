const supabase = require("../BANCODEDADOS/Conexao_supabase")

async function excluirusuario(cpf) {

    const cpfnormalizado = cpf.trim().replace(/\D/g, "")

    const { data, error } = await supabase
        .from("usuarios")
        .delete()
        .eq("cpf", cpfnormalizado)
        .select()

    if (error) {
        return {
            valido: false,
            mensagem: error.message
        }
    }

    if (data.length === 0) {
        return {
            valido: false,
            mensagem: "CPF não encontrado."
        }
    }

    return {
        valido: true,
        mensagem: "Usuário excluído com sucesso."
    }
}

module.exports = excluirusuario