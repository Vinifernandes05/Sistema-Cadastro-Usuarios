# 💼💻 Sistema de Cadastro de Usuários

## 📌 Sobre o Projeto

Este projeto consiste no desenvolvimento de um sistema completo de cadastro de usuários (CRUD), permitindo realizar operações de **criação, listagem, edição e exclusão de usuários** de forma dinâmica e interativa.

A aplicação foi construída com foco em **organização de código, separação de responsabilidades, experiência do usuário e desenvolvimento web**.

Além disso, o projeto possui **integração com API externa** para busca automática de endereço via CEP, proporcionando uma melhor experiência ao usuário.

🔗 **Link do Projeto:**   https://sistema-cadastro-usuarios.onrender.com/

---

## 🎯 Objetivos do Projeto

- Praticar desenvolvimento Full Stack
- Implementar operações CRUD completas
- Trabalhar com requisições HTTP (GET, POST, PUT, DELETE)
- Trabahar com API externa
- Manipular dados em formato JSON
- Desenvolver interfaces dinâmicas com JavaScript
- Organizar o projeto em camadas (Frontend, Backend, Validações, Banco)
- Melhorar a experiência do usuário com interface simples e funcional

---

## 🚀 Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

### 🔹 Frontend
- HTML5
- CSS3
- JavaScript

### 🔹 Backend
- Node.js
- Express.js

### 🔹 Outros
- Git
- GitHub
- JSON 
- API ViaCEP

---

## ⚙️ Funcionalidades

✔️ Cadastro de usuários  
✔️ Listagem de usuários em formato de cards  
✔️ Edição de dados do usuário  
✔️ Exclusão com confirmação personalizada  
✔️ Integração com API de CEP (preenchimento automático de endereço)  
✔️ Formatação automática de CPF e CEP  
✔️ Footer profissional com contatos pessoais  
✔️ Validações de: Nome completo, Email, CPF e CEP (com busca automática)  

---

## 📂 Estrutura do Projeto

```bash
SISTEMA-CADASTRO-USUARIOS
│
├── BANCODEDADOS
│ ├── Dados_usuarios.json # Banco de dados (JSON)
│ ├── Ler_banco.js # Leitura do banco
│ └── Salvar_banco.js # Escrita no banco
│
├── BUSCARCEP
│ └── Buscar_cep.js # Consumo de API de CEP
│
├── CONTROLEUSUARIO
│ ├── Editar_dados_usuario.js # Eedição de usuários cadastrados
│ ├── Excluir_usuario.js # Exclusão de usuários cadastrados
│ ├── Listar_usuarios.js # Listagem de usuários cadastrados
│ └── Salvar_usuario.js # Salvamento de novos usuários
│
├── FRONTEND
│ ├── index.html # Estrutura da aplicação
│ ├── style.css # Estilização
│ ├── script.js # Lógica principal (frontend)
│ └── formatacoes.js # Máscaras (CPF, CEP)
│
├── SERVIDOR
│ └── server.js # Servidor Node.js (Express)
│
├── VALIDARCADASTRO
│ ├── Validar_cep.js # Validação do CEP informado pelo usuário
│ ├── Validar_cpf.js # Validação do CPF
│ ├── Validar_email.js # Validação de email
│ └── Validar_nomecompleto.js # Validação do nome completo do usuário
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## 🔄 Fluxo da Aplicação

1. Usuário interage com a interface (front-end)
2. JavaScript envia requisições para o back-end
3. O servidor processa a lógica (CRUD)
4. Os dados são lidos ou atualizados no arquivo JSON
5. A resposta retorna para o front-end
6. A interface é atualizada dinamicamente

---

## 🌐 Integração com API 

O sistema utiliza a API externa ViaCEP para consulta de CEP, permitindo o preenchimento automático dos campos:

- Rua
- Bairro
- Cidade
- Estado

---

## 📞 Contato

👤 **Vinicius Sousa Fernandes**

- 📧 Email: vinifernandes2005@gmail.com  
- 💼 LinkedIn: https://linkedin.com/in/viniciussousaf  
- 💻 GitHub: https://github.com/Vinifernandes05  

---
