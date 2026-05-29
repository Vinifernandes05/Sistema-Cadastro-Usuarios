const supabase = require("../BANCODEDADOS/Conexao_supabase")

function validarCPF(CPF) {

    const cpfnormalizado = CPF.trim();

    if (cpfnormalizado === "") {
        return {
            valido: false,
            mensagem: "CPF não pode estar vazio."
        }
    }

    const validarformatocpf =
        /^(\d{11}|\d{3}\.\d{3}\.\d{3}\-\d{2})$/.test(cpfnormalizado)

    if (!validarformatocpf) {
        return {
            valido: false,
            mensagem: "CPF inválido. Formatação incorreta."
        }
    }

    return {
        valido: true
    }
}

async function cpfrepetido(CPF, cpfIgnorar = null) {

    const cpfnormalizado = CPF.trim().replace(/\D/g, "")

    const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("cpf", cpfnormalizado)

    if (error) {
        return {
            valido: false,
            mensagem: "Erro ao validar CPF."
        }
    }

    if (data.length > 0) {

        if (cpfIgnorar && data[0].cpf === cpfIgnorar) {
            return {
                valido: true
            }
        }

        return {
            valido: false,
            mensagem: "CPF já cadastrado."
        }
    }

    return {
        valido: true
    }
}

module.exports = { validarCPF, cpfrepetido }