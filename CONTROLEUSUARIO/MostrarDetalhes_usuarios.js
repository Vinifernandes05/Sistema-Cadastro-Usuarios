

function detalhesusuarios(numerodigitado) { // Função para mostrar os detalhes do usuário, mostrando todos os dados fornecidos, inclusive o endereço completo.
  let usuarios = [] 
   const detalhes = fs.readFileSync ("Dados_usuarios.json", "utf-8") 
   usuarios = JSON.parse(detalhes) 
   const indice = numerodigitado - 1 // O usuário digita o número do usuário, mas, como o array começa do 0, tem que subtrair 1 para mostrar o usuário correto.

      if (!/^(\d{1}|(\d{2}|(\d{3})))$/.test(numerodigitado))  { // Deixa o usuario digitar somente nessa formatação: "X" OU  "YY" OU "ZZZ"
      console.log("\nErro de formatação. Digite apenas o número do usuário.");
      return; // Retorna para a função que chamou, ou seja, para "detalhesusuarios", para o usuário digitar novamente.
   }       

         if (!usuarios[indice]) { // Verifica se existe um usuário no índice digitado.
         console.log(`\nUsuário ${indice + 1} não encontrado.`);
         return; // Retorna para a função que chamou, ou seja, para "detalhesusuarios", para o usuário digitar novamente.

   } else { 

   console.log(`\nUsuario ${indice + 1} `); // Mostra o número do usuário, usando o índice + 1 para mostrar o número correto, já que o índice começa do 0.
   console.log("Nome Completo: ", usuarios[indice]["Nome Completo"] ); // Usa essa formatação por causa do espaço que tem "Nome Completo". Mostra o nome completo do usuário do índice digitado.
   console.log("E-mail: ", usuarios[indice]["E_mail"]); // Usa essa formatação por causa do underline(_) que tem "E_mail". Mostra o e-mail do usuário do índice digitado.
   console.log("CPF: ", usuarios[indice].CPF); // Usa essa formatação pelo motivo de não ter espaço nem simbolo, então é só usar o ponto "CPF". Mostra o CPF do usuário do índice digitado.
   console.log("CEP: ", usuarios[indice].CEP); // Usa essa formatação pelo motivo de não ter espaço nem simbolo, então é só usar o ponto "CEP". Mostra o CEP do usuário do índice digitado.
   console.log("Rua: ", usuarios[indice].Rua); // Usa essa formatação pelo motivo de não ter espaço nem simbolo, então é só usar o ponto "Rua". Mostra a rua do usuário do índice digitado.
   console.log("Bairro: ", usuarios[indice].Bairro); // Usa essa formatação pelo motivo de não ter espaço nem simbolo, então é só usar o ponto "Bairro". Mostra o bairro do usuário do índice digitado.
   console.log("Cidade: ", usuarios[indice].Cidade); // Usa essa formatação pelo motivo de não ter espaço nem simbolo, então é só usar o ponto "Cidade". Mostra a cidade do usuário do índice digitado.
   console.log("Estado: ", usuarios[indice].Estado); // Usa essa formatação pelo motivo de não ter espaço nem simbolo, então é só usar o ponto "Estado". Mostra o estado do usuário do índice digitado.
   } 
}
