const { prismaClient } = require("../model/prismaClient");

class classifications {
  async classifications(req, res) {
    try {
      const { team, player } = req.body;

      const getNameTeam = await prismaClient.teams.findMany({
        where: {
          id: team
        }
      });

      const classification = await prismaClient.classification.create({
        data: {
          team: team,
          teamPlayer: getNameTeam[0].name,
          J: 0,
          P: 0,
          V: 0,
          E: 0,
          D: 0,
          GP: 0,
          GC: 0,
          SG: 0,
          name: player
        },
      });

      return res.status(201).json(classification);
    } catch (error) {
      console.log(error);
      return res.status(404).json("insertion error!");
    }
  }
}

module.exports = { classifications };
