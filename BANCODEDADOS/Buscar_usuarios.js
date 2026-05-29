// Arquivo responsável por buscar os usuários cadastrados no banco de dados e retornar um array de objetos JS com os dados dos usuários.

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