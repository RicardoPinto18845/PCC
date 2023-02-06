const express = require('express')
const app = express()
const router = express.Router();
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");


const { teamCreateTeamPersistence } = require('../../use-cases/teamCreateTeamPersistence');
const { teamAddMemberPersistence } = require('../../use-cases/teamAddMemberPersistence');
const { teamRemoveMemberPersistente } = require('../../use-cases/teamRemoveMemberPersistente');
const { teamListAllTeamsPersistence } = require('../../use-cases/teamListAllTeamsPersistence');


const teamInteractor = require('../../use-cases/teamInteractorMongoDB');

app.use('/', router);
app.use(express.json());


/**
 * @api {post} /teams/createteam Criar uma Equipa
 * @apiName Criar Equipa
 * @apiGroup Equipas
 *
 * @apiBody {String} name Nome da Equipa.
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "User Created successfully"
 * }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 * {
 *   "status": "403",
 *   "message" : "Cannot create team"
 * }
 */
router.route('/teams/createteam')
    .post(async(req, res) => {
        
        try {
            const { name } = req.body;

            if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
            {
                token = req.headers.authorization.split(" ")[1]

                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                

                const {username} = decoded
                
                const team = await teamInteractor.createteam({ teamCreateTeamPersistence: teamCreateTeamPersistence }, { name, username });
                
                return res.json(team);
            }

            return res.json("Error")

        } catch (error) {
             return res.json("Error")
        }

    });


/**
 * @api {post} /teams/addmember Adicionar um membro a Equipa
 * @apiName Adicionar Membro
 * @apiGroup Equipas
 *
 * @apiBody {String} new_member Nome do novo membro.
 * @apiBody {String} name Nome da Equipa.
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "Member Added Sucessufly!"
 * }
 * 
 *@apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 * {
 *   "status": "403",
 *   "message" : "Permission Denied!"
 * }
 */
router.route('/teams/addmember')
.post(async(req, res) => {
    
    try {
        const { new_member, name } = req.body;

        if(new_member != null || new_member != undefined || name != null || name != undefined )
        {
            if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
            {
                token = req.headers.authorization.split(" ")[1]
                
                const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
                const {username}= decoded
                
                // Verificar se o capitao
                const team = await teamInteractor.addmember({ teamAddMemberPersistence }, { username, new_member, name });
                
                return res.json(team);
            }
        }

        return res.json({"Error": "name or new_member can't be null"})

    } catch (error) {
        return res.json({"Error": error})
    }

});


 /**
 * @api {post} /teams/removemember Remover Membro
 * @apiName Remover Membro
 * @apiGroup Equipas
 *
 * @apiBody {String} remove_member Nome do Membro a Remover.
 * @apiBody {String} name Nome da Equipa.
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "Member Removed Sucessufly!"
 * }
 *@apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 * {
 *   "status": "403",
 *   "message" : "Permission Denied!d"
 * }
 */
router.route('/teams/removemember')
    .post(async(req, res) => {
        
        try {
            const { remove_member, name } = req.body;

            if(remove_member != null || remove_member != undefined )
            {
                
                if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
                {
                    token = req.headers.authorization.split(" ")[1]
                    const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
                    const {username}= decoded
                    
                    
                    // Verificar se o capitao
                    const team = await teamInteractor.removemember({ teamRemoveMemberPersistente }, { username, remove_member, name });
                    
                    return res.json(team);
                }
            }

            return res.json({"Error": "name or remove_member can't be null"})

        } catch (error) {
            return res.json({"Error": error})
        }

    });

 /**
 * @api {get} /teams/listallteams Visualizar todas as equipas
 * @apiName Visualizar Equipas
 * @apiGroup Equipas
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : " {
 *           "_id": "6388c21fc568f4f291315407",
 *           "name": "Espanha",
 *           "username": "ricardo",
 *           "date": "2022-12-01T15:02:55.971Z",
 *           "membros": [
 *               "helder",
 *               "ricardo",
 *               "miguel"
 *           ],
 *           "__v": 0
 *       }"
 * }
 */
router.route('/teams/listallteams')
    .get(async(req, res) => {
        
        try {
            if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
            {
                token = req.headers.authorization.split(" ")[1]
                const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
                const {username} = decoded
                console.clear()
                // Verificar se o capitao
                const team = await teamInteractor.listallmembers({ teamListAllTeamsPersistence }, { username });
              
                return res.json(team);
          }

        } catch (error) {
            return res.json({"Error": error})
        }

    });


module.exports = router