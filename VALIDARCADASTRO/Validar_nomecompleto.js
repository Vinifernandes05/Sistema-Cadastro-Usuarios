// Arquivo responsável pela validação da formatação do Nome.

// Função para permitir salvar o Nome Completo somente se tiver apenas letras (maiúsculas ou minúsculas, inclusive acentuadas) e espaços entre os nomes. Também garante que o Nome Completo não seja uma string vazia.
function nomeincorreto (nomecompleto) {
   const nome = nomecompleto.trim().replace(/\s+/g, " ");

      if (nome === "") { // Verifica se o Nome Completo é uma string vazia, ou seja, se o usuário não digitou nada ou apenas espaços em branco.
         return {
            valido: false,
            mensagem: "Nome Completo não pode estar vazio."
         }
      }

   const validarformatonome = (/^[A-Za-zÀ-ÿ ]+$/.test(nome)) // Permiti apenas letras (maiúsculas ou minúsculas, inclusive acentuadas) e espaços entre os nomes. Se tiver algum número ou caractere especial, retorna a mensagem de erro para o frontend.

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

module.exports = nomeincorreto // Exporta a função "nomeincorreto()".