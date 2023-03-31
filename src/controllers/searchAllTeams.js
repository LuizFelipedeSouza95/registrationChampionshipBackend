const { prismaClient } = require("../model/prismaClient");

class searchAllTeams {
  async searchAllTeams(req, res) {
    const Users = await prismaClient.teams.findMany();
    return Users.length > 0
      ? res.status(200).json(Users)
      : res.status(204).send();
  }
}

module.exports = { searchAllTeams };
