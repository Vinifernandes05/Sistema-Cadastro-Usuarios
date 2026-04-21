// Arquivo responsável pela exclusão do usuário.

const lerbanco = require ("../BANCODEDADOS/Ler_banco"); // Importa a função "lerbanco()", do arquivo "Ler_banco" e da pasta "BANCODEDADOS".
const salvarbanco = require ("../BANCODEDADOS/Salvar_banco"); // Importa a função "salvarbanco()", do arquivo "Salvar_banco" e da pasta "BANCODEDADOS".

// Função responsável pela exclusão do usuário, a partir do CPF informado.
function excluirusuario (cpf) {
    const usuarios = lerbanco();

    if (usuarios.length === 0) {
        return {
            valido: false,
            mensagem: "Nenhum usuário cadastrado."
        }
    }
    
    const cpfnormalizado = cpf.trim().replace(/\D/g, "") // Normaliza o CPF que o usuário acabou de digitar

    let indice = -1

    for (let i = 0; i < usuarios.length; i++) {

        const cpfBancoNormalizado = usuarios[i].cpf.trim().replace(/\D/g, "") // Normaliza o CPF já cadastrado no banco, no arquivo JSON.

        if (cpfBancoNormalizado === cpfnormalizado) { // Compara se o CPF do usuário do banco é o mesmo que o do CPF que foi digitado
            indice = i // Se realmente é, guarda a posição do usuário
            break
        }
    }

    if (indice === -1) {
        return {
            valido: false,
            mensagem: "CPF não encontrado."
        }
    }

    const nomeUsuarioRemovido = usuarios[indice].nomecompleto // Seleciona o usuário excluido.
    usuarios.splice(indice, 1) // Remove apenas o usuário do array.
    salvarbanco(usuarios);

    return {
        valido: true,
        mensagem: `Usuário ${nomeUsuarioRemovido} excluído com sucesso.`
    }
}

module.exports = excluirusuario;