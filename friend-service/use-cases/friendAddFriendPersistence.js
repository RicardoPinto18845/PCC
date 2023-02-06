const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//const Game = mongoose.model('Game', );
const axios = require('axios');
const Friend = require('../framework/dabatase/model/friendModel');

exports.friendAddFriendPersistence = async(friend) => {

    try {
        const {username, friend_name } = friend

        // retornar equipas do utilizador e depois jogos
        const listfriend = await Friend.find({ username : username}); // Or expression
        // Verirficar se o user existe 
        if (listfriend.length === 0) {
            let friend_list = await Friend.create({ username , friends: [friend_name] })
            return ({ status: "200", message: "Friend Created"})
        }
        const value = listfriend[0].friends.filter(element => element === friend_name );
        // Verificar se n existe amigo do user na friend list
        if ( value.length === 0) {
            let list = Array();
            listfriend[0].friends.forEach(element => list.push(element))
            list.push(friend_name)
            console.log(list)
            const friend_list = await Friend.updateOne({ username }, { $set: { "friends": list }})
            return ({ status: "200", message: "Friend Created"})
        }
        
        axios.post('http://localhost:7060/createLog', {
            code : process.env.SECRET_KEY, 
            username: username,
            log_id: "Adicionar Amigo"
        })
        .then((game) => {
            console.log(game.status);
        });
       
        return ({ status: "403", message: "Already have this Friend in the friend list." })
        
     } 
     catch (Error) {
         console.log(Error) // Com base no codigo de erro retornar algo 
     }
 }