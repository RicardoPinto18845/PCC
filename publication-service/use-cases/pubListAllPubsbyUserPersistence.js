const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//const Game = mongoose.model('Game', );
const axios = require('axios');
const PUB = require('../framework/dabatase/model/pubModel');

exports.pubListAllPubsbyUserPersistence = async(username) => {

    try {
        // retornar equipas do utilizador e depois jogos
        const listpub = await PUB.find({username}); // Or expression
        
        axios.post('http://localhost:7060/createLog', {
            code : process.env.SECRET_KEY, 
            username: username,
            log_id: "Listar Publicações de um User"
        })
        .then((game) => {
            console.log(game.status);
        });

        return ({ status: "200", message: listpub })
     } 
     catch (Error) {
         console.log(Error) // Com base no codigo de erro retornar algo 
     }
 }