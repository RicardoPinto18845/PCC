const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//const Game = mongoose.model('Game', );
const axios = require('axios');
const Games = require('../framework/dabatase/model/gameModel');



exports.gamegetgamePersistente = async(games) => {
    const { username } = games;
     try {

        const game = await Game.find({email: username });
        console.log(game);
        axios.post('http://localhost:7060/createLog', {
            code : process.env.SECRET_KEY, 
            username: username,
            log_id: "Listar Jogos"
        })
        .then((game) => {
            console.log(game.status);
        });
 
         return ({ status: "200", message: game})
     } 
     catch (Error) {
         console.log(Error)
     }
 }