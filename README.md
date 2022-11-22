# API De Games
Esta API é utilizada para registrar seus games favoritos.
## Endpoints
### GET /games
Esse endpoint é responsável por retornar a listagem de todos os games do banco de dados.
#### Parâmetros
Nenhum
#### Respostas
##### OK! 200
Caso essa resposta aconteça você ira receber a listagem de todos os games.
Exemplo de resposta:
```
[
    {
        "id": 23,
        "title": "Call of Duty 3",
        "year": 2019,
        "price": 60
    },
    {
        "id": 65,
        "title": "GTA V",
        "year": 2020,
        "price": 59
    },
    {
        "id": 15,
        "title": "Minecraft",
        "year": 2007,
        "price": 40
    }
]
```
##### Falha na autenticação! 401
Caso essa resposta aconteça, significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado. 
Exemplo de resposta:
```
{
    "err": "Token Inválido"
}
```

### POST /auth
Esse endpoint é responsável por retornar fazer o processo de login
#### Parâmetros
email:E-mail do usuário cadastrado no sistema.

senha: Senha do usuário cadastrado no sistema, com aquele determinado e-mail.

Exemplo:
```
{
    "email": "greicesilva@gmail.com",
    "senha": "1234"
}
```
#### Respostas
##### OK! 200
Caso essa resposta aconteça você ira receber o token JWT para conseguir acessar endpoints protegidos na API.
Exemplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJncmVpY2VzaWx2YUBnbWFpbC5jb20iLCJpYXQiOjE2NjkwNzc3MTksImV4cCI6MTY2OTI1MDUxOX0.KtArni4uYaB7-LOXncqnrwVqXkuZINuYZyO_sttnX4o"
}
```
##### Falha na autenticação! 401
Caso essa resposta aconteça, significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Senha ou E-mail incorretos. 
Exemplo de resposta:
```
{ err: "Credenciais erradas!" }
```

