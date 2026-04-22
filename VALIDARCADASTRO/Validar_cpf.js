// Arquivo responsável pela validação da formatação do CPF.

const lerbanco = require("../BANCODEDADOS/Ler_banco"); // Importa a função "lerbanco()", do arquivo "Ler_banco" e da pasta "BANCODEDADOS" para ler o banco de dados e obter o array de usuários cadastrados, para verificar se o CPF digitado já foi usado anteriormente.

// Função que permite salvar o CPF somente se tiver 11 digitos númericos seguidos, ou seguindo essa formatação: XXX.XXX.XXX-XX
function validarCPF (CPF) { 
const cpfnormalizado = CPF.trim();
    
    if (cpfnormalizado === "") {  // Verifica se o CPF é uma string vazia, ou seja, se o usuário não digitou nada ou apenas espaços em branco.
        return {
            valido: false, 
            mensagem: "CPF não pode estar vazio."
         }
      }

        const validarformatocpf = (/^(\d{11}|\d{3}\.\d{3}\.\d{3}\-\d{2})$/.test(cpfnormalizado))  // Permiti o CPF somente se tiver 11 digitos númericos seguidos, ou seguindo essa formatação: XXX.XXX.XXX-XX

        if (!validarformatocpf) { // Verifica se o CPF digitado segue a formatação correta, ou seja, se tem 11 dígitos numéricos seguidos ou se tem a formatação com pontos e hífen. Se não seguir, retorna a mensagem de erro para o frontend.
            return { 
                valido: false, 
                mensagem: "CPF inválido. Formatação incorreta."
            }
        }
                return {
                    valido: true
                }
}

// Função para verificar se o CPF digitado já foi cadastrado anteriormente, comparando o CPF digitado com os CPFs dos usuários já cadastrados no banco de dados. Permite ignorar um CPF específico, útil para a edição de dados, evitando erro de "CPF já cadastrado" quando o usuário não alterar o CPF.
function cpfrepetido (CPF, cpfIgnorar = null) {
const usuarios = lerbanco()
const cpfnormalizado = CPF.trim().replace(/\D/g, "")

    for (let i = 0; i < usuarios.length; i++) {

    const cpfBancoNormalizado = usuarios[i].cpf.trim().replace(/\D/g, "")

      if (cpfIgnorar && cpfBancoNormalizado === cpfIgnorar) { // Ignora o próprio usuário, evitando erro de "CPF já cadastrado" na edição de dados.
         continue
      }

    if (cpfBancoNormalizado === cpfnormalizado) { // Compara o CPF digitado (normalizado) com o CPF de cada usuário do banco (normalizado). Se encontrar um CPF igual, retorna a mensagem de erro para o frontend.
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

module.exports = { validarCPF, cpfrepetido } // Exporta as funções "validarCPF" e "cpfrepetido".