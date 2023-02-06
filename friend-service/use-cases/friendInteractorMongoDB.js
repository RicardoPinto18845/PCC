const { FriendEntity } = require("../entities/FriendEntity")

exports.addfriend = async({ friendAddFriendPersistence }, { username, friend_username }) => {
    try {
        const friend = new FriendEntity({
            username,
            friend_username
        })

        console.log(friend)

        const schedulegame = await friendAddFriendPersistence(friend)
        return schedulegame
    } catch (error) {
        console.log(error)
        throw error
    }
}


exports.removefriend = async({ friendRemoveFriendPersistence }, { username, friend_username }) => {
    try {
        const friend = new FriendEntity({
            username,
            friend_username
        })

        console.log(friend)

        const schedulegame = await friendRemoveFriendPersistence(friend)
        return schedulegame
    } catch (error) {
        console.log(error)
        throw error
    }
}

exports.listfriend = async({ friendListFriendPersistence }, { username }) => {
    try {
        const schedulegame = await friendListFriendPersistence(username)
        return schedulegame
    } catch (error) {
        console.log(error)
        throw error
    }
}
