const { UserEntity } = require("../entities/UserEntity")

exports.registeruser = async({ userRegisterPersistence }, { name, username, password, email }) => {
    try {
        const user = new UserEntity({
            name,
            username,
            password,
            email
        })

        const registerUser = await userRegisterPersistence(user)
        return registerUser
    } catch (error) {
        console.log(error)
        throw error
    }
}

exports.loginuser = async({ userLoginPersistence }, { username, password }) => {
    try {
        const user = new UserEntity({
            username,
            password
        })

        const loginUser = await userLoginPersistence(user)
        return loginUser
    } catch (error) {
        console.log(error)
        throw error
    }
}

exports.changepassworduser = async({ userChangePasswordPersistence }, { token, password }) => {
    try {
        const user = new UserEntity({
            token,
            password
        })

        const changePasswordUser = await userChangePasswordPersistence(user)
        return changePasswordUser
    } catch (error) {
        console.log(error)
        throw error
    }
}