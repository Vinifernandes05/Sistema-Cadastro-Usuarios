// Arquivo responsável pela validação da formatação do Email e pela verificação da existência de um Email igual já cadastrado no sistema.

const lerbanco = require("../BANCODEDADOS/Ler_banco");

function emailincorreto (email) { // Função que NÃO permite que o campo "E-mail" fique com espaços em branco/ENTER.
   const emailnormalizado = email.trim().toLowerCase();

      if (emailnormalizado === "") { 
         return {
            valido: false, 
            mensagem: "E-mail não pode estar vazio."
         }
      }

   const validarformatoemail = (/^[A-Za-z0-9]+@(gmail|hotmail)\.com$/.test(emailnormalizado)) // Garante que se for digitado apenas letras e números no email antes do "@" e, logo após, tenha a formatação restritta a "@gmail.com" e "@hotmail.com".
      
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


function emailrepetido (email) { // Função que NÃO permite salvar um mesmo e-mail que já está inserido no sistema.
   const usuarios = lerbanco() // Declara usuários e chama a função de "lerbanco" para realizar a leitura do arquivo do banco de dados.
   const emailnormalizado = email.trim().toLowerCase();

      for (let i = 0; i < usuarios.length; i++) {  
         if (usuarios[i].email.trim().toLowerCase() === emailnormalizado) { 
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

module.exports = { emailincorreto, emailrepetido };

