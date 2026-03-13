// Arquivo responsável pelas formatações do CPF e CEP, que são visiveis na tela.

function formatarCPF (cpf) { // Transforma a visualização do CPF na tela "XXX.XXX.XXX-XX"
    cpf = cpf.replace(/\D/g, "") // Remove tudo que não for dígito (letras, pontos, traços, espaços). "\D" significa "não dígito". O "g" aplica em toda a string.
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2") // Captura os 3 primeiros dígitos e coloca um ponto depois.
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Captura os últimos 3 dígitos seguidos de 1 ou 2 dígitos no final ($), e coloca um traço entre eles.
        return cpf
}
    

function formatarCEP (cep) { // Transforma a visualização do CEP na tela "XXXXX-XXX"
    cep = cep.replace(/\D/g, "")
    cep = cep.replace(/(\d{5})(\d)/, "$1-$2")
        return cep
}

module.exports = {formatarCEP, formatarCPF}