exports.TeamEntity = class TeamEntity {
    constructor({ name, username, date, membros, idteam}) {
        this.name = name;
        this.username = username;
        this.date = date;
        this.membros = membros;
        this.idteam = idteam;
    }
}