const express = require('express')
const app = express()
const router = express.Router();
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

const { gameScheduleGamePersistence } = require('../../use-cases/gameScheduleGamePersistence');

const { gamesListAllGamesPersistence } = require('../../use-cases/gamesListAllGamesPersistence');

const { gameAcceptGamePersistence } = require('../../use-cases/gameAcceptGamePersistence');

const { gameRejectGamePersistence } = require('../../use-cases/gameRejectGamePersistence');

const gameInteractor = require('../../use-cases/gameInteractorMongoDB.js');


app.use('/', router);
app.use(express.json());


/**
 * @api {post} /game/schedule Criar um Jogo
 * @apiName Criar um Jogo
 * @apiGroup Jogos
 *
 * @apiBody {String} idTeam1 Nome da Equipa 1.
 * @apiBody {String} idTeam2 Nome da Equipa 2.
 * @apiBody {String} gameDateTime Data do Jogo.
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "Game Scheduled"
 * }
 */
router.route('/game/schedule')
    .post(async(req, res) => {
        
        try {
            const { idTeam1, idTeam2, gameDateTime } = req.body;
            console.log(idTeam1);

            if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
            {
                token = req.headers.authorization.split(" ")[1]

                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                console.log(decoded)
                const {username} = decoded; 
                
                const scheduleGame = await gameInteractor.schedulegame({ gameScheduleGamePersistence }, { username, idTeam1, idTeam2, gameDateTime, status: "Pending"});
                
                return res.json(scheduleGame);
            }

             return res.json("Error")

        } catch (error) {
             return res.json("Error")
        }

    });

/**
 * @api {get} /games/listallgames Visualizar todos os Jogos
 * @apiName Visualizar Jogos
 * @apiGroup Jogos
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "{
 *           "_id": "6388d1f5d4d2382adad8b389",
 *           "username": "ricardo",
 *           "idTeam1": "Espanha",
 *           "idTeam2": "Iraque",
 *           "gameDateTime": "2023-02-22T00:00:00.000Z",
 *           "status": "Rejected",
 *           "__v": 0
 *       },
 *       {
 *           "_id": "6388d1fdd4d2382adad8b38b",
 *           "username": "ricardo",
 *           "idTeam1": "Espanha",
 *           "idTeam2": "Polonia",
 *           "gameDateTime": "2023-02-22T00:00:00.000Z",
 *           "status": "true",
 *           "__v": 0
 *       },
 * }
 */
router.route('/games/listallgames')
.get(async(req, res) => {
    
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        {
            token = req.headers.authorization.split(" ")[1]
            const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            const {username} = decoded
            const team = await gameInteractor.listallgames({ gamesListAllGamesPersistence }, { username });
            
            return res.json(team);
        }

    } catch (error) {
        return res.json({"Error": error})
    }

});

/**
 * @api {post} /games/acceptgame Aceitar um Jogo
 * @apiName Aceitar um Jogo
 * @apiGroup Jogos
 *
 * @apiBody {String} idGame Id do Jogo.
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "Game Accepted"
 * }
  *@apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 * {
 *   "status": "403",
 *   "message" : "Permission Denied!d"
 * }
 */
router.route('/games/acceptgame')
.post(async(req, res) => {
    const { idGame } = req.body;

    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        {
            token = req.headers.authorization.split(" ")[1]
            const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            const {username} = decoded
            const game = {idGame: idGame, username: username}


            const game2 = await gameInteractor.acceptgame({ gameAcceptGamePersistence }, {game});
            
            return res.json(game2);
        }

    } catch (error) {
        return res.json({"Error": error})
    }

});

/**
 * @api {post} /games/rejectgame Rejeitar um Jogo
 * @apiName Rejeitar um Jogo
 * @apiGroup Jogos
 *
 * @apiBody {String} idGame Id do Jogo.
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "Game Rejected"
 * }
  *@apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 * {
 *   "status": "403",
 *   "message" : "Permission Denied!"
 * }
 */
router.route('/games/rejectgame')
.post(async(req, res) => {
    const { idGame } = req.body;

    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        {
            token = req.headers.authorization.split(" ")[1]
            const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            const {username} = decoded
            const game = {idGame: idGame, username: username}
            const result = await gameInteractor.rejectgame({ gameRejectGamePersistence }, {game});
            return res.json(result);
        }

    } catch (error) {
        return res.json({"Error": error})
    }

});


module.exports = router