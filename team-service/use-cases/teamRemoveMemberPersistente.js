const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//const Game = mongoose.model('Game', );
const axios = require('axios');
const Team = require('../framework/dabatase/model/teamModel');



exports.teamRemoveMemberPersistente = async(team) => {

const { membros, name, username} = team;
    try 
    {
        const team = await Team.find({name});
        console.log(team)
        if(username == team[0].username)
        {
            const index = team[0].membros.indexOf(membros[0]);
            if (index > -1) { 
                team[0].membros.splice(index, 1); 
            }
            
            console.log(team[0].membros)

            const schedule_game = await Team.updateOne({ name }, {
                $set: { "membros": team[0].membros }
            })
    
            axios.post('http://localhost:7060/createLog', {
            code : process.env.SECRET_KEY, 
            username: username,
            log_id: "Remover Membro da Equipa"
            })
            .then((game) => {
                console.log(game.status);
            });
    
            return ({ status: "200", message: "Member Removed Sucessufly!"})
        }
        else return  ({ status: "403", message: "Permission Denied!"})
    } 
     catch (Error) {
         console.log(Error) // Com base no codigo de erro retornar algo 
     }
 }