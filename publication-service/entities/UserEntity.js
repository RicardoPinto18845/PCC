exports.UserEntity = class UserEntity {
    constructor({ username, password, email, token }) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.token = token;
    }
}