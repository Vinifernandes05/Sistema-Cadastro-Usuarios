// Arquivo responsável pela busca do CEP do usuário, retornando os dados da API.

// Função para buscar o CEP do usuário, retornando os dados da API.
async function buscarcep (CEP){ 
    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${CEP}/json/`) // Busca os dados do CEP na API ViaCEP, utilizando o CEP informado pelo usuário.

        if (!resposta.ok) { // Verifica se a resposta da API foi bem-sucedida (status 200). Se não for, retorna a mensagem de erro para o frontend.
            return {
                valido: false,
                mensagem: "Erro ao buscar o CEP. Tente novamente mais tarde."
            }
        }
        
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

    }  catch (error) { // Captura erros de rede ou outros erros inesperados durante a busca do CEP, retornando uma mensagem de erro genérica para o frontend.
            return {
                valido: false,
                mensagem: "Erro ao conectar com o serviço de CEP."
            }
        }
}

module.exports = buscarcep // Exporta a função "buscarcep()".