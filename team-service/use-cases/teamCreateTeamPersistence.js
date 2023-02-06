const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//const Game = mongoose.model('Game', );
const axios = require('axios');
const Team = require('../framework/dabatase/model/teamModel');


// Login Endpoint
exports.teamCreateTeamPersistence = async(team) => {

   const { name, username, date, membros} = team;
    try {
        const schedule_game = await Team.create({
            name,
            username,
            date,
            membros
        })

        axios.post('http://localhost:7060/createLog', {
            code : process.env.SECRET_KEY, 
            username: username,
            log_id: "Criar Equipa"
        })
        .then((game) => {
            console.log(game.status);
        });

        return ({ status: "200", message: "Team Created!"})
    } 
    catch (Error) {
        return ({ status: "403", message: "Cannot create team"})
    }
}
