exports.GameEntity = class GameEntity {
    constructor({ username, idTeam1, idTeam2, gameDateTime, status }) {
        this.username = username;
        this.idTeam1 = idTeam1;
        this.idTeam2 = idTeam2;
        this.gameDateTime = gameDateTime;
        this.status = status;
    }
}