// Arquivo responsável pela validação da formatação do CPF.

function validarCPF (CPF) { // Função que permite salvar o CPF somente se tiver 11 digitos númericos seguidos, ou seguindo essa formatação: XXX.XXX.XXX-XX
const cpfnormalizado = CPF.trim();
const validarformatocpf = (/^(\d{11}|\d{3}\.\d{3}\.\d{3}\-\d{2})$/.test(cpfnormalizado))  // Permiti o CPF somente se tiver 11 digitos númericos seguidos, ou seguindo essa formatação: XXX.XXX.XXX-XX
    
    if (!validarformatocpf) { // Se o CPF NÃO tiver a formatação correta.
        return { 
            valido: false, 
            mensagem: "CPF inválido. Formatação incorreta."
        }
    }
            return {
                valido: true
            }
}

module.exports = validarCPF



