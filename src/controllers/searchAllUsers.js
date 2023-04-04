const { prismaClient } = require("../model/prismaClient");

class searchAllUsers {
  async searchAllUsers(req, res) {
    const Users = await prismaClient.users.findMany({
      include: {
        classifications: true,
        roundsHome: true,
        roundVisiting: true,
      },
    });
    return Users.length > 0
      ? res.status(200).json(Users)
      : res.status(204).send();
  }
}

module.exports = { searchAllUsers };
