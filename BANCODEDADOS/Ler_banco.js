// Arquivo responsável pela leitura do Banco de Dados, transformando o JSON em array de objetos JS.

const fs = require("fs"); 
const path = require("path"); 

// Função para ler o arquivo "Dados_usuarios.js" e transformar o conteúdo JSON em array de objetos JS.
function lerbanco() { 
const caminho = path.join(__dirname, "Dados_usuarios.json");
    let usuarios = [] 
        if(!fs.existsSync(caminho)) {
            return [];
        }
            const conteudo = fs.readFileSync(caminho, "utf-8"); 
            usuarios = JSON.parse(conteudo);  
        
        return usuarios;
}

module.exports = lerbanco; // Exporta a função "lerbanco()".