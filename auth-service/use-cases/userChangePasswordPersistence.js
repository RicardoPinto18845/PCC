const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const User = mongoose.model('User');
const axios = require('axios');

//Model
const User = require('../framework/dabatase/model/userModel');

exports.userChangePasswordPersistence = async(user) => {
    try {
        const { token, password } = user
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const {username} = decoded
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.updateOne({ username }, {
            $set: { "password": hashedPassword }
        })
        axios.post('http://localhost:7060/createLog', {
            code : process.env.SECRET_KEY, 
            username: username,
            log_id: "Mudar Password"
        })
        .then((game) => {
            console.log(game.status);
        });
        return ({ status:"200", message: "Password Updated!" })
    } catch (error) {
        // Codigo expirou
    }

    return ({status:"404", message: "Not found"})
   

}