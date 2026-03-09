// Arquivo responsável pela busca do CEP do usuário, retornando os dados da API.

async function buscarcep (CEP){ // Função para buscar o CEP via API e salvar os dados.
const retornodaapi = await fetch(`https://viacep.com.br/ws/${CEP}/json/`) // Espera a internet responder.
const dados = await retornodaapi.json(); // Espera converter a resposta em JSON.
// Utiliza await 2 vezes, pois, buscar e converter levam tempo.
return dados; // Retorna os dados da API.
}