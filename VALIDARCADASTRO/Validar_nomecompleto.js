// Arquivo responsável pela validação da formatação do Nome.

function nomeincorreto (nomecompleto) {
   const nome = nomecompleto.trim();

      if (nome === "") {
         return {
            valido: false,
            mensagem: "Nome Completo não pode estar vazio."
         }
      }

   const validarformatonome = (/^[A-Za-zÀ-ÿ ]+$/.test(nome))

      if (!validarformatonome) {
         return {
            valido: false,
            mensagem: "Nome Completo Inválido. Formatação incorreta."
         }
      } 
         return {
            valido: true
         }
}

module.exports = nomeincorreto