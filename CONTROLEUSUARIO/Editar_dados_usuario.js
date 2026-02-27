

function usuarioincorreto (usuariodigitado) { // Função para validar o número do usuário digitado, verificando se o número corresponde a um usuário cadastrado, e se o número digitado tem a formatação correta, ou seja, se é um número de 1 a 999, sem letras nem símbolos.
   let usuario = [] 
   const conteudodoaquivo = fs.readFileSync ("Dados_usuarios.json", "utf-8")
   usuario = JSON.parse(conteudodoaquivo) 
   const indice = usuariodigitado - 1

      if (!usuario[indice]){  
         console.log("\nUsuário não encontrado. Digite apenas o número do usuário cadastrado.");
         return true; // Se o usuário digitar um número que NÃO corresponde a nenhum usuário cadastrado, retorna true.
    
   } else {

      console.log(`\nUsuário ${indice + 1} encontrado no banco de dados.`);

      console.log(`\nUsuário ${indice + 1}`);
      console.log("Nome Completo: ", usuario[indice]["Nome Completo"]); 
      console.log("E-mail: ", usuario[indice]["E_mail"]); 
      console.log("CPF: ", usuario[indice].CPF); 
      console.log("CEP: ", usuario[indice].CEP); 
      console.log("Rua: ", usuario[indice].Rua); 
      console.log("Bairro: ", usuario[indice].Bairro); 
      console.log("Cidade: ", usuario[indice].Cidade); 
      console.log("Estado: ", usuario[indice].Estado); 
      }
      return false; // Se o usuário digitar um número que corresponde a um usuário cadastrado, retorna false
} 


function dadoincorreto(dado){ // Função para validar o dígito correto para o campo de editar o dado de um usuário.

   if (!/^[1-4]$/.test(dado)) { // Permite somente um dígito númerico entre 1 e 4, correspondente ao Nome Completo, E-mail, CPF e CEP.
      console.log("\nDigite apenas a numeração do dado que deseja editar.");
      return true // Se o usuário digitar um número que NÃO corresponde a nenhum campo, retorna true.
   }
   return false; // Se o usuário digitar um número que corresponde a um campo, retorna false.
}


function validarcampodadousuario (campodigitado) { // Função para validar o campo do dado do usuário que ele deseja editar, verificando se o número digitado corresponde a um campo existente, e se o campo digitado é válido para ser editado. 
   const campos = { // Objeto que relaciona o número digitado com o campo correspondente do usuário.
   "1": "Nome Completo",
   "2": "E_mail",
   "3": "CPF",
   "4": "CEP",
   }
   return campos[campodigitado] // Retorna o campo correspondente ao número/campo digitado pelo usuário.
}


function substituiresalvardado (usuariodigitado, campoescolhido, novodado) { // Função para substituir o dado antigo do usuário pelo novo dado fornecido pelo usuário, no campo escolhido, e depois salvar os dados no arquivo JSON, sem sobrescrever os dados antigos.
   const leraquivo = fs.readFileSync ("Dados_usuarios.json", "utf-8") 
   const usuarios = JSON.parse(leraquivo) 
   const indice = usuariodigitado - 1 
   
   usuarios[indice][campoescolhido] = novodado; // Substitui o dado antigo do usuário pelo novo dado fornecido pelo usuário, no campo escolhido.
   
   const dados = JSON.stringify(usuarios, null, 2) 
   fs.writeFileSync("Dados_usuarios.json", dados)
}


function atualizarendereco (usuariodigitado, novocep, novoendereco) { // Função para atualizar o endereço do usuário, substituindo o CEP antigo pelo novo CEP fornecido pelo usuário, e os outros dados do endereço (rua, bairro, cidade e estado) pelos dados retornados pela API, e depois salvar os dados no arquivo JSON, sem sobrescrever os dados antigos.
   const lerarquivo = fs.readFileSync("Dados_usuarios.json", "utf-8")
   const usuarios = JSON.parse(lerarquivo)
   const indice = usuariodigitado - 1

      usuarios[indice]["CEP"] = novocep // Substitui o CEP antigo do usuário pelo novo CEP fornecido pelo usuário.
      usuarios[indice]["Rua"] = novoendereco.logradouro  // Substitui a rua antiga do usuário pela nova rua retornada pela API.
      usuarios[indice]["Bairro"] = novoendereco.bairro // Substitui o bairro antigo do usuário pelo novo bairro retornado pela API.
      usuarios[indice]["Cidade"] = novoendereco.localidade // Substitui a cidade antiga do usuário pela nova cidade retornada pela API.
      usuarios[indice]["Estado"] = novoendereco.uf // Substitui o estado antigo do usuário pelo novo estado retornado pela API.
   
   const dados = JSON.stringify(usuarios, null, 2)
   fs.writeFileSync("Dados_usuarios.json",dados )
}
