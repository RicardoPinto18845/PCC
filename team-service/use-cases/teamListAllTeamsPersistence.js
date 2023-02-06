const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//const Game = mongoose.model('Game', );
const axios = require('axios');
const Team = require('../framework/dabatase/model/teamModel');


exports.teamListAllTeamsPersistence = async(username) => {

     try {
        const team = await Team.find( { membros : username });
        console.log(team)

        
        axios.post('http://localhost:7060/createLog', {
            code : process.env.SECRET_KEY, 
            username: username,
            log_id: "Listar Equipas"
        })
        .then((game) => {
            console.log(game.status);
        });

        return ({ status: "200", message: team})
     } 
     catch (Error) {
         console.log(Error) // Com base no codigo de erro retornar algo 
     }
 }