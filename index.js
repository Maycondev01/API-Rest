const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    ]
}
app.get("/games", (req, res) => { // Ver todos os Games
    res.statusCode = 200;
    res.json(DB.games);
})

app.get("/games/:id", (req, res) => { // Ver Por Id
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
app.post("/game", (req, res) => { // Adicionar Novo Game
    var { title, price, year } = req.body;

    DB.games.push({
        id: 18,
        title,
        price,
        year
    });

    res.sendStatus(200)

})
app.delete("/game/:id", (req, res) => { // Deletar o Game
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
app.put("/game/:id", (req, res) => { // Editar o Game
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
})
app.listen(3000, function (error) {
    if (error) {
        console.log(error)
    } else {
        console.log("Servidor online!")
    }
})
