// Arquivo responsável pela validação da formatação do CPF.

const lerbanco = require("../BANCODEDADOS/Ler_banco");

function validarCPF (CPF) { // Função que permite salvar o CPF somente se tiver 11 digitos númericos seguidos, ou seguindo essa formatação: XXX.XXX.XXX-XX
const cpfnormalizado = CPF.trim();
    
    if (cpfnormalizado === "") { 
        return {
            valido: false, 
            mensagem: "CPF não pode estar vazio."
         }
      }

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


function cpfrepetido (CPF) {
const usuarios = lerbanco()
const cpfnormalizado = CPF.trim().replace(/\D/g, "")

    for (let i = 0; i < usuarios.length; i++) {
    const cpfbanco = usuarios[i].cpf.trim().replace(/\D/g, "")

    if (cpfbanco === cpfnormalizado) {
        return {
            valido: false,
            mensagem: "CPF já cadastrado."
        }
    }
}
        return {
            valido: true
        }
}

module.exports = { validarCPF, cpfrepetido }