//Arquivo responsável pelo salvamento do cadastro do usuário no arquivo JSON, em formato de array de objetos.

const fs = require("fs");
const path = require("path");
const lerbanco = require("../BANCODEDADOS/Ler_banco"); // Importa a função "lerbanco()" da pasta "BANCODEDADOS", do arquivo "Ler_banco"

function salvarusuario (usuario) { // Função para salvar o usuário em um arquivo JSON, e guardar os dados sem sobrescrever os dados antigos.
      const usuarios = lerbanco()

             usuarios.push (usuario); // Adiciona o usuario dentro da lista, do array usuarios, sem sobrescrever nem apagar os dados antigos.
             const caminho = path.join(__dirname, "../BANCODEDADOS/Dados_usuarios.json"); // "path.join" monta o caminho correto independente de onde rodar o servidor. "__dirname" sempre aponta para a pasta do arquivo atual.
             const dados = JSON.stringify(usuarios, null, 2); // Transforma o array "usuarios" em uma string JSON. Objeto → String. JS -> JSON.
             fs.writeFileSync (caminho, dados) // Escreve os dados e salva tudo no arquivo "Dados_usuarios.json".
                  console.log("\nDados salvos com sucesso.")
        }

module.exports = salvarusuario; // Exporta a função "salvarusuario".
