'user strict';
//esquema da DB
const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const GameSchema = new Schema(
    {
        username:{type:String, require:true},
        idTeam1:{type:String, require:true},
        idTeam2:{type:String, require:true},
        gameDateTime:{type:Date, require:true},
        status:{type:String, require:true}

    },
    {collection:'games'}
)

const Game = mongoose.model('Game', GameSchema)

module.exports=Game
