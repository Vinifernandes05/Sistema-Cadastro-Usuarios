

function buscarexcluirusuario (usuariodigitado) { // Função para buscar o usuário que o usuário deseja excluir.
   const leraquivo = fs.readFileSync("Dados_usuarios.json", "utf-8")
   const usuario = JSON.parse(leraquivo)
   const indice = usuariodigitado - 1

   if(!usuario[indice]) {
      console.log("\nUsuário não encontrado. Digite apenas o número do usuário cadastro que você deseja excluir")
      return true; // Se o usuário digitar um número que NÃO corresponde a nenhum usuário cadastrado, retorna true.

} else {

   console.log(`\nUsuário ${indice + 1} encontrado no banco de dados.`);

   console.log("\nUsuário: ", usuario[indice]);
   console.log("Nome Completo:", usuario[indice]["Nome Completo"]);
   console.log("E-mail: ", usuario[indice]["E_mail"]);
   console.log("CPF: ", usuario[indice].CPF);
   console.log("CEP: ", usuario[indice].CEP);
   console.log("Rua: ", usuario[indice].Rua);
   console.log("Bairro: ", usuario[indice].Bairro);
   console.log("Cidade ", usuario[indice].Cidade);
   console.log("Estado: ", usuario[indice].Estado);
      }
   return false; // Se o usuário digitar um número que corresponde a um usuário cadastrado, retorna false.
}


function excluirusuario (usuariodigitado) { // Função para excluir o usuário, removendo o usuário do array de usuários, e depois salvar os dados no arquivo JSON, sem sobrescrever os dados antigos.
   const leraquivo = fs.readFileSync("Dados_usuarios.json", "utf-8")
   const usuario = JSON.parse(leraquivo)
   const indice = usuariodigitado - 1

   usuario.splice(indice, 1); // Remove o usuário do array de usuários, usando o "splice", que remove um elemento do array a partir do índice digitado pelo usuário, e o número 1 indica que é para remover apenas um elemento.
   const dados = JSON.stringify(usuario, null, 2)
   fs.writeFileSync("Dados_usuarios.json", dados)
}
