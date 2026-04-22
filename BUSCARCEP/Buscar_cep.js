// Arquivo responsável pela busca do CEP do usuário, retornando os dados da API.

// Função para buscar o CEP do usuário, retornando os dados da API.
async function buscarcep (CEP){ 
const resposta = await fetch(`https://viacep.com.br/ws/${CEP}/json/`) // Busca os dados do CEP na API ViaCEP, utilizando o CEP informado pelo usuário.
const dados = await resposta.json(); // Converte a resposta da API em formato JSON para um objeto JS, para facilitar o acesso aos dados.
// Utiliza await 2 vezes, pois, buscar e converter levam tempo.

    if (dados.erro) { // Verifica se a resposta da API contém o campo "erro", indicando que o CEP não foi encontrado ou não existe.
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

module.exports = buscarcep // Exporta a função "buscarcep()".