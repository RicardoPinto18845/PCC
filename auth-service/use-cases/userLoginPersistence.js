const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const axios = require('axios');
require("dotenv").config();

//Model
require('../framework/dabatase/model/userModel');


// Generate acess token
function generateAcessToken(users) {
    try {
        return jwt.sign({ id: users._id, username: users.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 86400 })
    } catch (error) {
        console.log(error)
    }
}

// Login Endpoint
exports.userLoginPersistence = async(user) => {
    try {
        const { password, username } = user;
        // Find User
        //const users = await User.find( { email : req.body.username} );
        const users = await User.findOne({ username }).lean();
        // Login with Valid Credential
        if (users) {
            // Check Password
            const descrpPassword = await bcrypt.compare(password, users.password);
            if (descrpPassword) {
                // Generate token
                const accessToken = generateAcessToken(users)

                axios.post('http://localhost:7060/createLog', {
                    code : process.env.SECRET_KEY, 
                    username: username,
                    log_id: "Login"
                })
                .then((game) => {
                    console.log(game.status);
                });

                return ({ token: accessToken })
            } 
            else {
                return({status:"403", message: "Invalid Credential" })
            }
        } 
        else {
            ({status:"404", message: "Not found" })
        }
    } catch (error) {
        return ({ message: "Error: " + error.message })
    }
}


