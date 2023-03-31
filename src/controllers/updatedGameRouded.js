const { prismaClient } = require("../model/prismaClient");

class updatedTableRouded {
  async updatedTableRouded(req, res) {
    const { roundNumber, homePlayer, scoreHome, visitingPlayer, scoreVisiting } = req.body;

    const game = await prismaClient.round.findMany({
      where: { roundNumber: roundNumber },
    });

    const filterPlayer = game.filter(function (jogo) {
      return (
        jogo.visitingPlayer === homePlayer || jogo.homePlayer === homePlayer
      );
    });

    const updatedGame = await prismaClient.round.update({
      where: { id: filterPlayer[0].id },
      data: {
        scoreHome: scoreHome,
        scoreVisiting: scoreVisiting,
      },
    });

    return res.status(200).json(updatedGame);
  }
}

module.exports = { updatedTableRouded };
