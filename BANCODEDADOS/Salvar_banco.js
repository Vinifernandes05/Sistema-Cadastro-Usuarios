// Arquivo responsável pelo salvamento do banco de dados.

const fs = require("fs")
const path = require("path"); 

function salvarbanco (usuarios) {
    const caminho = path.join(__dirname, "Dados_usuarios.json");
            fs.writeFileSync(caminho, JSON.stringify(usuarios, null, 2));
}

module.exports = salvarbanco