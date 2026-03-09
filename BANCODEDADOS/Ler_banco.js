// Arquivo responsável pela leitura do Banco de Dados, transformando o JSON em array de objetos JS.

const fs = require("fs"); // Importa o módulo de sistema de arquivos.
const path = require("path"); // 

function lerbanco() { // Função para ler o arquivo "Dados_usuarios.js" e o seu conteúdo.
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