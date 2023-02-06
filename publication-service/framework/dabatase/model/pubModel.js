'user strict';
//esquema da DB
const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const PubSchema = new Schema(
    {
        username:{type:String, require:true},
        content: {type: String,  require:true}

    },{
        timestamps: true
    },
    {collection:'pub'}
)

const Pub = mongoose.model('Pub', PubSchema)

module.exports=Pub
