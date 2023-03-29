const { prismaClient } = require("../model/prismaClient");

class classifications {
  async classifications(req, res) {
    try {
      const { time, jogador/* , P, J, V, E, D, GP, GC, SG */ } = req.body;

      const classification = await prismaClient.tableClassification.create({
        data: {
          time,
          jogador,
          J: 0,
          P: 0,
          V: 0,
          E: 0,
          D: 0,
          GP: 0,
          GC: 0,
          SG: 0,
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
