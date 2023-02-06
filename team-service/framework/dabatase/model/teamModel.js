'user strict';
//esquema da DB
const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const TeamSchema = new Schema(
    {
        name:{type:String, require:true, unique:true},
        username:{type:String, require:true},
        date:{type:Date, require:true},
        membros:{type:Array, require:false},
    },
    {collection:'team'}
)

const Team = mongoose.model('Team', TeamSchema)

module.exports=Team
