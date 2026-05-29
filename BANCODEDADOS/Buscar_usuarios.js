// Arquivo responsável pela leitura do Banco de Dados, transformando o JSON em array de objetos JS.

const supabase = require("./Conexao_supabase.js");  

// Função para ler o arquivo "Dados_usuarios.js" e transformar o conteúdo JSON em array de objetos JS.
async function buscarusuarios() { 
    const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .order("id", { ascending: true });

    if (error) { // Verifica se ocorreu um erro ao buscar os usuários no banco de dados.
        return {
            valido: false, // Indica que a operação de busca dos usuários não foi bem-sucedida.
            dados: [], // Retorna um array vazio para os dados dos usuários, indicando que não foi possível obter os usuários do banco de dados.
            mensagem: "Erro ao buscar usuários no banco de dados."
        };
    }

    return {
        valido: true, // Indica que a operação de busca dos usuários foi bem-sucedida.
        dados: data
    };
}

module.exports = buscarusuarios; // Exporta a função "buscarusuarios()".