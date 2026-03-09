// Arquivo responsável pela exclusão do usuário.

const lerbanco = require ("../BANCODEDADOS/Ler_banco"); // Importa a função "lerbanco()", do arquivo "Ler_banco" e da pasta "BANCODEDADOS".

function excluirusuario (cpf) {
    const usuarios = lerbanco();

    if (usuarios.length === 0) {
        return {
            valido: false,
            mensagem: "Sem usuário cadastrado."
        }
    }

    const indice = usuarios.findIndex(usuario => usuario.cpf === cpf); // Percorre cada usuário e verifica se o cpf deste usuário é o recebido pela função.
     if (indice === -1) { // Se não encontrar nenhum CPF... o findIndex retorna -1 automaticamente, não é algo inventado.
        return {
            valido: false,
            mensagem: "CPF não encontrado."
        }
     }

     const nomeUsuarioRemovido = usuarios[indice].nomecompleto; // Seleciona o usuário excluido.
     usuarios.splice(indice, 1) // Remove apenas o usuário do array.
        
        return {
            valido: true,
            mensagem: `Usuário ${nomeUsuarioRemovido} excluído com sucesso.`
        }
 
}