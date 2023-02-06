const { TeamEntity } = require("../entities/TeamEntity")

exports.createteam = async({ teamCreateTeamPersistence }, { name, username}) => {
    try {

        let date = new Date();
        date = Date.now();
        const membros = new Array();
        membros.push(username);

        const team = new TeamEntity({
            name,
            username,
            date,
            membros
        })

        console.log(team)

        const schedulegame = await teamCreateTeamPersistence(team)
        return schedulegame
    } catch (error) {
        console.log(error)
        throw error
    }
}


exports.addmember = async({ teamAddMemberPersistence }, { username, new_member, name}) => {
    try {

        // Procurar equipa
        const membros = new Array();
        membros.push(new_member);

        console.log(membros)

        const team = new TeamEntity({
            username,
            name,
            membros
        })

        console.log(team)

        const addmember = await teamAddMemberPersistence(team)
        return addmember
    } catch (error) {
        console.log(error)
        throw error
    }
}


exports.removemember = async({ teamRemoveMemberPersistente }, { username, remove_member, name}) => {
    try {

       // Procurar equipa
        //console.log(username)
        let date = new Date()
        date = Date.now;
        const membros = new Array();
        membros.push(remove_member);


        const team = new TeamEntity({
            username,
            name,
            membros
        })


        const schedulegame = await teamRemoveMemberPersistente(team)
        return schedulegame
    } catch (error) {
        console.log(error)
        throw error
    }
}

exports.listallmembers = async({ teamListAllTeamsPersistence }, {username}) => {
    try {
        const listTeams = await teamListAllTeamsPersistence(username)
        return listTeams
    } catch (error) {
        console.log(error)
        throw error
    }
}
