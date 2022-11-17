const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const jwt = require('jsonwebtoken')

const JWTSecret = 'dkafksgasjgasjkrqmnkfcmaxf'


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function auth(req,res,next) { // SISTEMA DE AUTENTICAÇÃO USANDO JWT JSON WEB TOKEN.
    const authToken = req.headers['authorization'] // Vai achar um Headers na requisição e tá usando o Header de autorização do token.
    if(authToken != undefined) {
        const bearer = authToken.split(' '); // Split serve para separar e dividir por strings
        var token = bearer[1]; // Pegando a segunda parte do token

        jwt.verify(token, JWTSecret, (err,data) => { // Como é uma função assincrona, posso usar Promisse e Callback
            if(err) {
                res.status(401);
                res.json({err: "Token Inválido"});
            } else {
                req.token = token;
                req.loggedUser = {id: data.id, email: data.email}
                req.empresa = "Exatacor"
                next();
                // console.log(data);
            }
        })

    } else {
        res.status(401);
        res.json({err: "Token Inválido"});
    }
    console.log(authToken);
    // next();
}


var DB = {
    games: [
        {
            id: 23,
            title: "Call of Duty 3",
            year: 2019,
            price: 60
        },
        {
            id: 65,
            title: "GTA V",
            year: 2020,
            price: 59
        },
        {
            id: 15,
            title: "Minecraft",
            year: 2007,
            price: 40
        }
    ],
    users: [
        {
            id: 1,
            name: "Maycon Douglas",
            email: "mayconlundgren186@gmail.com",
            senha: "nodejs"
        },
        {
            id: 2,
            name: "Greice",
            email: "greicesilva@gmail.com",
            senha: "1234"
        }
    ]
}
app.get("/games", auth, (req, res) => { // Ver todos os Games
    res.statusCode = 200;
    res.json({empresa: req.empresa, users: req.loggedUser, games: DB.games}); // Usando variável que eu criei dentro do Middleware
})

app.get("/games/:id",auth, (req, res) => { // Ver Por Id
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id == id);

        if (game != undefined) {
            res.statusCode = 200;
            res.json(game)
        } else {
            res.sendStatus(404)
        }
    }
})
app.post("/game",auth, (req, res) => { // Adicionar Novo Game
    var { title, price, year } = req.body;

    DB.games.push({
        id: 18,
        title,
        price,
        year
    });

    res.sendStatus(200)

})
app.delete("/game/:id", auth, (req, res) => { // Deletar o Game
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id);
        var indice = DB.games.findIndex(g => g.id == id);

        if (indice == undefined) {
            res.sendStatus(404);
        } else {
            DB.games.splice(indice, 1);
            res.sendStatus(200)
        }
    }
})
app.put("/game/:id", auth, (req, res) => { // Editar o Game
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);

        if (game != undefined) {

            var { title, price, year } = req.body;

            if (title != undefined) {
                game.title = title;
            }
            if (price != undefined) {
                game.price = price;
                if (price == isNaN) {
                    res.statusCode = 400
                    res.sendStatus(400)
                } else {
                    res.sendStatus(200)
                }
            }
            if (year != undefined) {
                game.year = year
            }

            res.sendStatus(200);

        } else {
            res.sendStatus(404)
        }
    }
});

app.post("/auth", (req, res) => {
    var { email, senha } = req.body;;

    if (email != undefined) {
        var user = DB.users.find(u => u.email == email);

        if (user != undefined) {
            if (user.senha == senha) {
                // JsonWebToken armazenar informações dentro do token id e email do usuário, chama a chave secreta JWTSecret e quanto tempo o token deve expirar
                // Essa função é assincrona, então pode ser utilizado callback ou promise, no caso vamos usar o callback
                jwt.sign({ id: user.id, email: user.email }, JWTSecret, { expiresIn: '48h' }, (err, token) => {
                    if (err) {
                        res.status(400);
                        res.json({ err: "Falha interna" });
                    } else {
                        res.status(200);
                        res.json({ token: token });
                    }
                });
            } else {
                res.status(401);
                res.json({ err: "Credenciais erradas" });
            }

        } else {
            res.status(404);
            res.json({ err: "O Email enviado é inválido" })
        }
    } else {
        res.status(400);
        res.json({ err: "O Email enviado é inválido" })
    }
})


app.listen(3000, function (error) {
    if (error) {
        console.log(error)
    } else {
        console.log("Servidor online!")
    }
})
