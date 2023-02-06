const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//const Game = mongoose.model('Game', );
const axios = require('axios');
const Friend = require('../framework/dabatase/model/friendModel');

exports.friendRemoveFriendPersistence = async(friend) => {

    try {
        const {username, friend_name } = friend
        // retornar equipas do utilizador e depois jogos
        const listfriend = await Friend.find({ username : username}); // Or expression
        // Verirficar se o user existe 
        if (listfriend.length === 0) {
            return ({ status: "403", message: "You dont have any friend"})
        }
        const value = listfriend[0].friends.filter(element => element === friend_name );
        // Verificar se n existe amigo do user na friend list
        if ( value.length === 0) {
            return ({ status: "403", message: "This user is not you friend"})
        }

        const list = listfriend[0].friends.filter(element => element != friend_name );
        console.log("Nova", list)
        const friend_list = await Friend.updateOne({ username }, { $set: { "friends": list }})

        
        axios.post('http://localhost:7060/createLog', {
            code : process.env.SECRET_KEY, 
            username: username,
            log_id: "Remover Amigo"
        })
        .then((game) => {
            console.log(game.status);
        });
       
        return ({ status: "200", message: `You and ${friend_name} do not have a friend relationship` })
     } 
     catch (Error) {
         console.log(Error) // Com base no codigo de erro retornar algo 
     }
 }