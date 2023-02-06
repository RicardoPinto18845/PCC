const express = require('express')
const app = express()
const router = express.Router();
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

const { friendAddFriendPersistence } = require('../../use-cases/friendAddFriendPersistence');

const { friendRemoveFriendPersistence } = require('../../use-cases/friendRemoveFriendPersistence');

const { friendListFriendPersistence } = require('../../use-cases/friendListFriendPersistence');

const friendInteractor = require('../../use-cases/friendInteractorMongoDB');


app.use('/', router);
app.use(express.json());



/**
 * @api {post} /friend/addfriend Adicionar Amigo
 * @apiName Adicionar Amigo
 * @apiGroup Amigos
 *
 * @apiBody {String} friend_username Username para adicionar a lista de amizades.
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "Friend Created"
 * }
 *@apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 * {
 *   "status": "403",
 *   "message" : "Already have this Friend in the friend list."
 * }
 */
router.route('/friend/addfriend')
.post(async(req, res) => {
    
    try {
        const { friend_username } = req.body;

        if(friend_username != null || friend_username != undefined )
        {
            if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
            {
                token = req.headers.authorization.split(" ")[1]
                
                const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
                const {username}= decoded
                console.log(username)
                
                // Verificar se o capitao
                const team = await friendInteractor.addfriend({ friendAddFriendPersistence }, { username, friend_username });
                
                return res.json(team);
            }
        }

        return res.json({"Error": "name or new_member can't be null"})

    } catch (error) {
        return res.json({"Error": error})
    }

});

/**
 * @api {post} /friend/removefriend Remover Amigo
 * @apiName Remover Amigo
 * @apiGroup Amigos
 *
 * @apiBody {String} friend_username Username para remover da lista de amizades.
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "You and username do not have a friend relationship"
 * }
 *@apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 * {
 *   "status": "403",
 *   "message" : "You dont have any friend"
 * }
 *@apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 * {
 *   "status": "403",
 *   "message" : "This user is not you friend"
 * }
 */
router.route('/friend/removefriend')
.post(async(req, res) => {
    
    try {
        const { friend_username } = req.body;

        if(friend_username != null || friend_username != undefined )
        {
            if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
            {
                token = req.headers.authorization.split(" ")[1]
                
                const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
                const {username}= decoded
                
                // Verificar se o capitao
                const team = await friendInteractor.removefriend({ friendRemoveFriendPersistence }, { username, friend_username });
                
                return res.json(team);
            }
        }

        return res.json({"Error": "name or new_member can't be null"})

    } catch (error) {
        return res.json({"Error": error})
    }

});

 /**
 * @api {get} /friend/listfriend Visualizar a lista de amigos
 * @apiName Lista de Amigos
 * @apiGroup Amigos
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : " {
 *           "_id": "638b1a7bdsabb19530017bf4",
 *           "username": "Luis",
 *           "friends": [
 *               "manuel",
 *               "carlos"
 *           ],
 *           "__v": 0
 *       }"
 * }
 */
router.route('/friend/listfriend')
.get(async(req, res) => {
    
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        {
            token = req.headers.authorization.split(" ")[1]
            
            const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            const {username}= decoded
            
            // Verificar se o capitao
            const team = await friendInteractor.listfriend({ friendListFriendPersistence }, { username });
            
            return res.json(team);
        }

        return res.json({"Error": "name or new_member can't be null"})

    } catch (error) {
        return res.json({"Error": error})
    }

});

module.exports = router