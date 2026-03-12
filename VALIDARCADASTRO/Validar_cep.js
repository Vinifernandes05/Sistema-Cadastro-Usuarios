// Arquivo responsável pela validação da formatação do CEP.

function cepincorreto (CEP) { // Função que permite salvar o CEP somente se tiver 8 digitos numericos seguidos, ou se tiver a seguinte formatação: XXXXX-XXX
const cepnormalizado = CEP.trim().replace(/\D/g, "");
   
if (cepnormalizado === "") { 
         return {
            valido: false, 
            mensagem: "CEP não pode estar vazio."
         }
      }

const validarformatocep = (/^(\d{5}-\d{3}|\d{8})$/.test(cepnormalizado)) // Permiti até 8 dígitos numericos no CEP (00213254 OU 09278-921, sem hífem ou com)

   if(!validarformatocep) {
      return {
         valido: false,
         mensagem: "CEP inválido. Formatação incorreta."
      }
   }  
         return {
            valido: true
         }
}

module.exports = cepincorreto