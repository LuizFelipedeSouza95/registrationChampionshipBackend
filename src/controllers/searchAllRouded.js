const { prismaClient } = require('../model/prismaClient');

class searchAllRouded {
  async searchAllRouded(req, res) {
    const Rouded = await prismaClient.roudeds.findMany();
    return Rouded.length > 0
      ? res.status(200).json(Rouded)
      : res.status(204).send();
  }
}

module.exports = { searchAllRouded }