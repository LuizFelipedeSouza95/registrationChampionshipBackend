const { prismaClient } = require("../model/prismaClient");

class updatedTableRouded {
  async updatedTableRouded(req, res) {
    const {
      disabledInputs,
      roundNumber,
      homePlayer,
      scoreHome,
      visitingPlayer,
      scoreVisiting,
    } = req.body;

    const game = await prismaClient.round.findMany({
      where: { roundNumber: roundNumber },
    });

    const filterPlayer = game.filter(function (jogo) {
      return (
        jogo.visitingPlayers === homePlayer || jogo.homePlayer === homePlayer
      );
    });

    const updatedGame = await prismaClient.round.update({
      where: { id: filterPlayer[0].id },
      data: {
        scoreHome,
        scoreVisiting,
        disabledInputs,
      },
    });

    return res.status(200).json(updatedGame);
  }
}

module.exports = { updatedTableRouded };
