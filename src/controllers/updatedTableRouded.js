const { prismaClient } = require("../model/prismaClient");

class updatedTableRouded {
  async updatedTableRouded(req, res) {
    const { rouded, homePlayer, scoreHome, visitingPlayer, scoreVisiting } =
      req.body;

    const game = await prismaClient.roudeds.findMany({
      where: { rouded: rouded },
    });

    const filterPlayer = game.filter(function (jogo) {
      return (
        jogo.visitingPlayer === homePlayer || jogo.homePlayer === homePlayer
      );
    });

    const updatedGame = await prismaClient.roudeds.update({
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
