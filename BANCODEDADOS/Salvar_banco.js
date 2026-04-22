// Arquivo responsável pelo salvamento do banco de dados.

const fs = require("fs")
const path = require("path"); 

// Função para salvar o array de objetos JS no arquivo "Dados_usuarios.js" em formato JSON.
function salvarbanco (usuarios) {
    const caminho = path.join(__dirname, "Dados_usuarios.json");
            fs.writeFileSync(caminho, JSON.stringify(usuarios, null, 2));
}

module.exports = salvarbanco // Exporta a função "salvarbanco()".