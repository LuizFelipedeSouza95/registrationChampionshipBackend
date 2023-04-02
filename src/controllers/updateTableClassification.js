const { prismaClient } = require("../model/prismaClient");

class updateTableClassification {
  async updateTableClassification(req, res) {
    const { team, player1, gols1, player2, gols2 } = req.body;

    const team1 = await prismaClient.classification.findMany({
      where: { name: player1 },
    });
    const team2 = await prismaClient.classification.findMany({
      where: { name: player2 },
    });

    const getNameTeam1 = await prismaClient.teams.findMany({
      where: {
        id: team1[0].team
      }
    });

    const getNameTeam2 = await prismaClient.teams.findMany({
      where: {
        id: team2[0].team
      }
    });

    console.log(getNameTeam1);

    // Atualiza os valores para o time 1
    team1[0].GP += gols1;
    team1[0].GC += gols2;
    team1[0].SG = team1[0].GP - team1[0].GC;

    if (gols1 > gols2) {
      team1[0].P += 3;
      team1[0].V += 1;
      team2[0].D += 1;
    } else if (gols1 < gols2) {
      team2[0].P += 3;
      team2[0].V += 1;
      team1[0].D += 1;
    } else {
      team1[0].P += 1;
      team2[0].P += 1;
      team1[0].E += 1;
      team2[0].E += 1;
    }

    // Atualiza os valores para o time 2
    team2[0].GP += gols2;
    team2[0].GC += gols1;
    team2[0].SG = team2[0].GP - team2[0].GC;

    // Salva as alterações na tabela tableClassification
    const updatedTeam1 = await prismaClient.classification.update({
      where: { id: team1[0].id },
      data: {
        team: team1[0].team,
        teamPlayer: getNameTeam1[0].name,
        P: team1[0].P,
        V: team1[0].V,
        E: team1[0].E,
        D: team1[0].D,
        GP: team1[0].GP,
        GC: team1[0].GC,
        SG: team1[0].SG,
        name: player1
      },
    });

    const updatedTeam2 = await prismaClient.classification.update({
      where: { id: team2[0].id },
      data: {
        team: team2[0].team,
        teamPlayer: getNameTeam2[0].name,
        P: team2[0].P,
        V: team2[0].V,
        E: team2[0].E,
        D: team2[0].D,
        GP: team2[0].GP,
        GC: team2[0].GC,
        SG: team2[0].SG,
        name: player2
      },
    });

    const updated = {
      player1: updatedTeam1,
      player2: updatedTeam2,
    };

    //console.log(updatedTeam1, updatedTeam2);
    return res.status(200).json(updated);
  }
}

module.exports = { updateTableClassification };
