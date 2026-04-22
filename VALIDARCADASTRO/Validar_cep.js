// Arquivo responsável pela validação da formatação do CEP.

// Função para permitir salvar o CEP somente se tiver 8 digitos numericos seguidos, ou se tiver a seguinte formatação: XXXXX-XXX
function cepincorreto (CEP) {
const cepnormalizado = CEP.trim()
   
if (cepnormalizado === "") { // Verifica se o CEP é uma string vazia, ou seja, se o usuário não digitou nada ou apenas espaços em branco.
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

module.exports = cepincorreto // Exporta a função "cepincorreto()".