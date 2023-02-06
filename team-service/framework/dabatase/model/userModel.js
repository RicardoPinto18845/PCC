'user strict';
//esquema da DB
const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
        name:{type:String, require:true},
        username:{type:String, require:true, unique:true},
        password:{type:String, require:true},
        email:{type:String,require:true}
    },
    {collection:'users'}
)

const User = mongoose.model('User', UserSchema)

module.exports=User