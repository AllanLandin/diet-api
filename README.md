# Diet API 🥩🥫

Esse projeto é uma API construída em NodeJS que gerencia as refeições dos usuários 🥩

# Conceitos abordados 📘
- Roteamento
- Autenticação por JWT
- Banco de dados relacional
- Migrations
- Middlewares
- Variáveis de ambiente
- Processo de deploy

# Tecnologias utilizadas 👨‍💻

- Typescript
- Fastify
- Knex (Sqlite para desenvolvimento e POSTGRESQL para produção)

# Como rodar o projeto ❔

## Produção 🗺️
Para acessar a API em produção, acesse o link do projeto.

## Localmente 💻

1 - Para rodar a aplicação localmente, comece baixando o repositório com o seguinte comando:

`git clone https://github.com/AllanLandin/diet-api.git`

2 - Instale as dependências necessárias com `npm i`

3 - Depois, defina as variáveis de ambiente conforme o arquivo `.env.example` e retire a extensão `.example` do arquivo

4 - Rode as migrations do banco de dados com `npm run migrate:latest`

5 - Por fim, execute a aplicação com `npm run dev`!


# Rotas 🚋

### 🟢 POST /auth/register
- Registra um usuário no banco de dados

### 🟢 POST /auth/login
- Autentica o usuário com email e senha

### 🔴 POST /meals
- Registra uma nova refeição na conta do usuário logado
- Importante fornecer um body com as seguintes informações:
  
  - name: Título da refeição (string)
  - description: Descrição da refeição (string)
  - date: Data da refeição (timestamp)
  - isInDiet: Se aquela refeição está na dieta ou não (boolean)
 
### 🔴 PUT /meals/:id
- Altera uma refeiçãod específica do usuário logado
- Importante fornecer um body, igual a rota `POSTS`
- Importante fornecer o id da refeição na url

### 🔴 GET /meals
- Busca todas as refeições cadastradas do usuário logado

### 🔴 GET /meals/:id
- Busca uma refeição específica do usuário logado
- Importante fornecer o id da refeião na url

### 🔴 DELETE /meals/:id
- Exclui uma refeição específica do usuário logado
- Importante fornecer o id da refeião na url

### 🔵 GET /users/metrics/totalMeals/:id
- Busca a quantidade total de refeições de um determinado usuário (Não precisa estar logado)
- Importante fornecer o id do usuário na url

### 🔵 GET /users/metrics/totalMealsInDiet/:id
- Busca a quantidade total de refeições dentro da dieta de um determinado usuário (Não precisa estar logado)
- Importante fornecer o id do usuário na url

### 🔵 GET /users/metrics/totalMealsOutDiet/:id
- Busca a quantidade total de refeições fora da dieta de um determinado usuário (Não precisa estar logado)
- Importante fornecer o id do usuário na url

### 🔵 GET /users/metrics/betterSequence/:id
- Busca a melhor sequência de refeições dentro da dieta de um determinado usuário (Não precisa estar logado)
- Importante fornecer o id do usuário na url

