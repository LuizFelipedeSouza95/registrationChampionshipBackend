const { prismaClient } = require("../model/prismaClient");
const teams = require("../teams.json");

class createTeams {
  async createTeams(req, res) {
    try {
      const teamObjects = teams.map((name) => ({ name: name }));
      console.log(teamObjects);
      const createdTeams = await prismaClient.teams.createMany({
        data: teamObjects,
        skipDuplicates: true,
      });
      return res.status(201).json("Teams Created");
    } catch (error) {
      console.log(error);
      return res.status(404).json("insertion error!");
    }
  }
}

module.exports = { createTeams };
