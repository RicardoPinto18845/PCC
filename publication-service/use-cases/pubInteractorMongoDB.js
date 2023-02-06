
exports.createpub = async({ pubCreatePubPersistence }, { username, content }) => {
    try {
        const pub = await pubCreatePubPersistence(username, content)
        return pub
    } catch (error) {
        console.log(error)
        throw error
    }
}

exports.listallpub = async({ pubListAllPubsPersistence }, {  }) => {
    try {
        const pub = await pubListAllPubsPersistence()
        return pub
    } catch (error) {
        console.log(error)
        throw error
    }
}


exports.listallpubbyUser = async({ pubListAllPubsbyUserPersistence }, { username }) => {
    try {
        const pub = await pubListAllPubsbyUserPersistence(username)
        return pub
    } catch (error) {
        console.log(error)
        throw error
    }
}