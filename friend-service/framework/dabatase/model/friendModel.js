'user strict';
//esquema da DB
const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const GameSchema = new Schema(
    {
        username:{type:String, require:true},
        friends: {type: Array,  require:true}

    },
    {collection:'friend'}
)

const Friend = mongoose.model('Friend', GameSchema)

module.exports=Friend
