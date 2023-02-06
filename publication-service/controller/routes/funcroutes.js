const express = require('express')
const app = express()
const router = express.Router();
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

const { pubCreatePubPersistence } = require('../../use-cases/pubCreatePubPersistence');

const { pubListAllPubsPersistence } = require('../../use-cases/pubListAllPubsPersistence');

const { pubListAllPubsbyUserPersistence } = require('../../use-cases/pubListAllPubsbyUserPersistence');

const pubInteractor = require('../../use-cases/pubInteractorMongoDB');


app.use('/', router);
app.use(express.json());

 /**
 * @api {get} /pub/listallpubs Visualizar todas as publicações
 * @apiName Visualizar Publicações
 * @apiGroup Publicação
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "[
        {
            "_id": "638b316905ca39d8cee8c6d9",
            "username": "ricardo",
            "content": "Alguem Jogar hoje?",
            "createdAt": "2022-12-03T11:22:17.610Z",
            "updatedAt": "2022-12-03T11:22:17.610Z",
            "__v": 0
        },
        {
            "_id": "638b317b05ca39d8cee8c6db",
            "username": "carlos",
            "content": "Ganhamos...",
            "createdAt": "2022-12-03T11:22:35.840Z",
            "updatedAt": "2022-12-03T11:22:35.840Z",
            "__v": 0
        }
    ]"
 * }
 */
  router.route('/pub/listallpub')
  .get(async(req, res) => {
      
      try {
          if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
          {
              token = req.headers.authorization.split(" ")[1]
              const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
              const {username} = decoded
              // Verificar se o capitao
              const team = await pubInteractor.listallpub({ pubListAllPubsPersistence }, { });
            
              return res.json(team);
        }

      } catch (error) {
          return res.json({"Error": error})
      }

  });


 /**
 * @api {get} /pub/listpubsbyuser Visualizar todas as publicações de um utilizador
 * @apiName Visualizar Publicações de um Utilizador
 * @apiGroup Publicação
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "[
        {
            "_id": "638b316905ca39d8cee8c6d9",
            "username": "ricardo",
            "content": "Alguem Jogar hoje?",
            "createdAt": "2022-12-03T11:22:17.610Z",
            "updatedAt": "2022-12-03T11:22:17.610Z",
            "__v": 0
        },
        {
            "_id": "638b317b05ca39d8cee8c6db",
            "username": "ricardo",
            "content": "Ganhamos...",
            "createdAt": "2022-12-03T11:22:35.840Z",
            "updatedAt": "2022-12-03T11:22:35.840Z",
            "__v": 0
        }
    ]"
 * }
 */
    router.route('/pub/listpubsbyuser')
    .get(async(req, res) => {
        
        try {
            if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
            {
                token = req.headers.authorization.split(" ")[1]
                const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
                const {username} = decoded
                // Verificar se o capitao
                const team = await pubInteractor.listallpubbyUser({ pubListAllPubsbyUserPersistence }, { username });
              
                return res.json(team);
          }
  
        } catch (error) {
            return res.json({"Error": error})
        }
  
    });


/**
 * @api {post} /pub/createpub Criar uma Publicação
 * @apiName Criar uma Publicação
 * @apiGroup Publicação
 *
 * @apiBody {String} content Conteudo da Publicação.
 *
 * @apiSuccessExample {Json} Success-Response
 *  HTTP/1.1 200 ok 
 * {
 *    "status": "200",
 *    "message" : "Publication was been created"
 * }
*@apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 * {
 *   "status": "403",
 *   "message" : "Permission Denied!"
 * }
 */
router.route('/pub/createpub')
.post(async(req, res) => {
    const { content } = req.body;

    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        {
            token = req.headers.authorization.split(" ")[1]
            const decoded= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            const {username} = decoded

            const pub = await pubInteractor.createpub({ pubCreatePubPersistence }, {username, content});
            
            return res.json(pub);
        }

    } catch (error) {
        return res.json({"Error": error})
    }

});

module.exports = router