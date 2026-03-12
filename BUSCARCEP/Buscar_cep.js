// Arquivo responsável pela busca do CEP do usuário, retornando os dados da API.

async function buscarcep (CEP){ // Função para buscar o CEP via API e salvar os dados.
const resposta = await fetch(`https://viacep.com.br/ws/${CEP}/json/`) // Espera a internet responder.
const dados = await resposta.json(); // Espera converter a resposta em JSON.
// Utiliza await 2 vezes, pois, buscar e converter levam tempo.

    if (dados.erro) { // Se o CEP não existir...
        return {
            valido: false,
            mensagem: "CEP informado não encontrado."
        }
    }

    return {
        valido: true, 
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
    }

}

module.exports = buscarcep