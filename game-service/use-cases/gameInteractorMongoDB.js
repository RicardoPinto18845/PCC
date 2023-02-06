const { GameEntity } = require("../entities/GameEntity")

exports.schedulegame = async({ gameScheduleGamePersistence }, { username, idTeam1, idTeam2, gameDateTime, status }) => {
    try {
        const game = new GameEntity({
            username,
            idTeam1,
            idTeam2,
            gameDateTime,
            status
        })

        console.log(game)

        const schedulegame = await gameScheduleGamePersistence(game)
        return schedulegame
    } catch (error) {
        console.log(error)
        throw error
    }
}


exports.listallgames = async({ gamesListAllGamesPersistence }, {username}) => {
    try {
        const listGames = await gamesListAllGamesPersistence(username)
        return listGames
    } catch (error) {
        console.log(error)
        throw error
    }
}

exports.acceptgame = async({ gameAcceptGamePersistence }, {game}) => {
    try {
        console.log(game)
        const acceptGame = await gameAcceptGamePersistence(game)
        return acceptGame
    } catch (error) {
        console.log(error)
        throw error
    }
}

exports.rejectgame = async({ gameRejectGamePersistence }, {game}) => {
    try {
        console.log(game)
        const acceptGame = await gameRejectGamePersistence(game)
        return acceptGame
    } catch (error) {
        console.log(error)
        throw error
    }
}

