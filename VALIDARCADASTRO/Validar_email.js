// Arquivo responsável pela validação da formatação do Email e pela verificação da existência de um Email igual já cadastrado no sistema.

const lerbanco = require("../BANCODEDADOS/Ler_banco"); // Importa a função "lerbanco()", do arquivo "Ler_banco" e da pasta "BANCODEDADOS" para ler o banco de dados e obter o array de usuários cadastrados, para verificar se o E-mail digitado já foi usado anteriormente.

// Função que permite salvar o E-mail somente se tiver a formatação correta, ou seja, se tiver apenas letras e números antes do "@" e, logo após, tiver a formatação restritta a "@gmail.com" e "@hotmail.com". Também garante que o E-mail não seja uma string vazia.
function emailincorreto (email) { 
   const emailnormalizado = email.trim().toLowerCase();

      if (emailnormalizado === "") {  // Verifica se o E-mail é uma string vazia, ou seja, se o usuário não digitou nada ou apenas espaços em branco.
         return {
            valido: false, 
            mensagem: "E-mail não pode estar vazio."
         }
      }

   const validarformatoemail = (/^[A-Za-z0-9]+@(gmail|hotmail|outlook|yahoo)\.com$/.test(emailnormalizado)) // Garante que se for digitado apenas letras e números no email antes do "@" e, logo após, tenha a formatação restrita a "@gmail.com","@hotmail.com", "@outlook.com" ou "@yahoo.com".
      
      if(!validarformatoemail) {  
         return {
            valido: false,
            mensagem: "E-mail inválido. Formatação incorreta."
         }
      }
            return {
               valido: true
            }
}

// Função para verificar se o E-mail digitado já foi cadastrado anteriormente, comparando o E-mail digitado com os E-mails dos usuários já cadastrados no banco de dados. Permite ignorar um CPF específico, útil para a edição de dados, evitando erro de "E-mail já cadastrado" quando o usuário não alterar o E-mail. A comparação é feita ignorando letras maiúsculas ou minúsculas e espaços em branco antes ou depois do E-mail.
function emailrepetido (email, cpfIgnorar = null) {
   const usuarios = lerbanco() 
   const emailnormalizado = email.trim().toLowerCase();

      for (let i = 0; i < usuarios.length; i++) { 

         const cpfBancoNormalizado = usuarios[i].cpf.trim().replace(/\D/g, "") // Normaliza o CPF já cadastrado no banco, no arquivo JSON, para comparar com o cpfIgnorar e ignorar o próprio usuário na edição de dados, evitando erro de "E-mail já cadastrado" quando o usuário não alterar o E-mail.
          
         if (cpfIgnorar && cpfBancoNormalizado === cpfIgnorar) { // Ignora o próprio usuário, evitando erro de "E-mail já cadastrado" na edição de dados.
            continue
         }

         if (usuarios[i].email.trim().toLowerCase() === emailnormalizado) { // Compara o E-mail digitado (normalizado) com o E-mail de cada usuário do banco (normalizado). Se encontrar um E-mail igual, retorna a mensagem de erro para o frontend.
            return {
               valido: false,
               mensagem: "E-mail já cadastrado."
            }         
         }
      }
               return {
                  valido: true
               }                
}

module.exports = { emailincorreto, emailrepetido }; // Exporta as funções "emailincorreto()" e "emailrepetido()".

