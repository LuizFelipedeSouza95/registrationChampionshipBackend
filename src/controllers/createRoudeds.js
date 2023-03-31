const { prismaClient } = require("../model/prismaClient");
const { generateRoudeds } = require("./generateRoudeds");

class createRoudeds {
  async createRoudeds(req, res) {
    try {
      const Users = await prismaClient.users.findMany();
      const playersName = Users.map((obj) => obj.name);
      const roundeds = generateRoudeds(playersName);

      for (const round in roundeds) {
        const jogos = roundeds[round];
        const numeroround = round.match(/\d+/)[0];

        for (let i = 0; i < jogos.length; i++) {
          const jogo = jogos[i];

          await prismaClient.round.create({
            data: {
              roundNumber: parseInt(numeroround),
              homePlayer: jogo.casa,
              scoreHome: 0,
              scoreVisiting: 0,
              visitingPlayers: jogo.fora,
            },
          });
        }
      }
      return res.status(201).json("Rounds Created");
    } catch (error) {
      console.log(error);
      return res.status(404).json("insertion error!");
    }
  }
}

module.exports = { createRoudeds };
