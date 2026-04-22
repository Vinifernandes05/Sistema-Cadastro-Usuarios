// Arquivo responsável pela exclusão do usuário.

const lerbanco = require ("../BANCODEDADOS/Ler_banco"); // Importa a função "lerbanco()", do arquivo "Ler_banco" e da pasta "BANCODEDADOS" para ler o banco de dados e obter o array de usuários.
const salvarbanco = require ("../BANCODEDADOS/Salvar_banco"); // Importa a função "salvarbanco()", do arquivo "Salvar_banco" e da pasta "BANCODEDADOS" para salvar o array de usuários atualizado no banco de dados, após a exclusão do usuário.

// Função responsável pela exclusão do usuário, a partir do CPF informado.
function excluirusuario (cpf) {
    const usuarios = lerbanco(); 

    if (usuarios.length === 0) {
        return {
            valido: false,
            mensagem: "Nenhum usuário cadastrado."
        }
    }
    
    const cpfnormalizado = cpf.trim().replace(/\D/g, "") // Normaliza o CPF que o usuário acabou de digitar.

    let indice = -1

    for (let i = 0; i < usuarios.length; i++) {

        const cpfBancoNormalizado = usuarios[i].cpf.trim().replace(/\D/g, "") // Normaliza o CPF já cadastrado no banco, no arquivo JSON.

        if (cpfBancoNormalizado === cpfnormalizado) { // Compara o CPF que o usuário acabou de digitar (normalizado) com o CPF de cada usuário do banco (normalizado).
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

    const nomeUsuarioRemovido = usuarios[indice].nomecompleto // Guarda o nome do usuário que será excluido.
    usuarios.splice(indice, 1) // Remove apenas o usuário do array.
    salvarbanco(usuarios); // Salva o array atualizado (com o usuário removido) no banco de dados, sobrescrevendo o arquivo JSON.

    return {
        valido: true,
        mensagem: `Usuário ${nomeUsuarioRemovido} excluído com sucesso.`
    }
}

module.exports = excluirusuario; // Exporta a função "excluirusuario()".