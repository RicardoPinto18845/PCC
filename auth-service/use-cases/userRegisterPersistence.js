const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const User = mongoose.model('User', User);
const axios = require('axios');
const User = require('../framework/dabatase/model/userModel');

//Model
require('../framework/dabatase/model/userModel');

exports.userRegisterPersistence = async(user) => {
    const { name, email, password, username } = user;
    // Login with Valid Credential
    // Encrypt the Password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    //console.log("Hash --------------------");
    //console.log("Salt: " + request.body.password);
    //console.log("Password: " + hashedPassword);

    try {
        const create_user = await User.create({
            name,
            username,
            password: hashedPassword,
            email
        })
        
        console.log(create_user);

        axios.post('http://localhost:7060/createLog', {
            token : process.env.SECRET_KEY, 
            username: username,
            log_id: "Registo"
        })
        .then((game) => {
            console.log(game.status);
        });

        return ({ status: "200", message: "User Created"})
    } 
    catch (Error) {
        //console.log(Error) // Com base no codigo de erro retornar algo 
        if (Error.code === 11000) 
        {
            //console.log(Error)
            return ({ status: "401", message: "Already exist this user"})
        } // Meter deste genero os codigos
        else 
        {
            //console.log(Error)
            return ({ status: "404", message: Error})
        }
    } 
   

}