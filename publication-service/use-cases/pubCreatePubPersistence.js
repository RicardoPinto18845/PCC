const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//const Game = mongoose.model('Game', );
const axios = require('axios');
const Pub = require('../framework/dabatase/model/pubModel');

exports.pubCreatePubPersistence = async(username, content) => {

    try {

        let date = new Date();
        const new_pub = await Pub.create({ username: username, content: content,  });

        
        axios.post('http://localhost:7060/createLog', {
            code : process.env.SECRET_KEY, 
            username: username,
            log_id: "Criar Publicação"
        })
        .then((game) => {
            console.log(game.status);
        });

        return ({ status: "200", message: "Publication was been created" })
     } 
     catch (Error) {
        return ({ status: "403", message: "Permission Denied!" })
     }
 }