// Arquivo responsável pelas formatações do CPF e CEP (Frontend) que são visiveis na tela.

// Função responsável por mostrar o CPF na tela desse formato: "XXX.XXX.XXX-XX"
function formatarCPF (cpf) { 
    cpf = cpf.replace(/\D/g, "") // Remove tudo que não for dígito (letras, pontos, traços, espaços). "\D" significa "não dígito". O "g" aplica em toda a string.
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2") // Captura os 3 primeiros dígitos e coloca um ponto depois.
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Captura os últimos 3 dígitos seguidos de 1 ou 2 dígitos no final ($), e coloca um traço entre eles.
        return cpf
}
    
// Função responsável por mostrar o CEP na tela desse formato: "XXXXX-XXX"
function formatarCEP (cep) { 
    cep = cep.replace(/\D/g, "")
    cep = cep.replace(/(\d{5})(\d)/, "$1-$2")
        return cep
}

module.exports = {formatarCEP, formatarCPF} // Exporta as funções "formatarCEP" e "formatarCPF" para serem utilizadas no frontend.