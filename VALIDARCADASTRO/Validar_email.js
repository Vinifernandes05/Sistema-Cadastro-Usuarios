const supabase = require("../BANCODEDADOS/Conexao_supabase")

function emailincorreto(email) {

    const emailnormalizado = email.trim().toLowerCase();

    if (emailnormalizado === "") {
        return {
            valido: false,
            mensagem: "E-mail não pode estar vazio."
        }
    }

    const validarformatoemail = /^[A-Za-z0-9]+@(gmail|hotmail|outlook|yahoo)\.com$/.test(emailnormalizado)

    if (!validarformatoemail) {
        return {
            valido: false,
            mensagem: "E-mail inválido. Formatação incorreta."
        }
    }

    return {
        valido: true
    }
}

async function emailrepetido(email, cpfIgnorar = null) {

    const emailnormalizado = email.trim().toLowerCase();

    const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("email", emailnormalizado)

    if (error) {
        return {
            valido: false,
            mensagem: "Erro ao validar email."
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
            mensagem: "E-mail já cadastrado."
        }
    }

    return {
        valido: true
    }
}

module.exports = { emailincorreto, emailrepetido }