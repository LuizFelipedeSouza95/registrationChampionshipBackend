const { prismaClient } = require("../model/prismaClient");
const { generateRoudeds } = require("./generateRoudeds");

class createRoudeds {
  async createRoudeds(req, res) {
    try {
      const Users = await prismaClient.users.findMany();
      const players = Users.map((obj) => obj.name);
      const roundeds = generateRoudeds(players);

      for (const round in roundeds) {
        const jogos = roundeds[round];
        const numeroround = round.match(/\d+/)[0];
        for (const jogo of jogos) {
          await prismaClient.roudeds.create({
            data: {
              rouded: parseInt(numeroround),
              homePlayer: jogo.casa,
              scoreHome: 0,
              scoreVisiting: 0,
              visitingPlayer: jogo.fora,
            },
          });
        }
      }
      return res.status(201).json("success");
    } catch (error) {
      console.log(error);
      return res.status(404).json("insertion error!");
    }
  }
}

module.exports = { createRoudeds };
