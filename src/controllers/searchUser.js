const { prismaClient } = require('../model/prismaClient');

class searchUser {
  async searchUser(req, res) {
    try {
      const email = req.query.email;

      const user = await prismaClient.users.findMany({
        where: {
          email: email,
        },
      });

      if (user.length === 0) {
        return res.status(404).json("Selected user does not exist");
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  }
}

module.exports = { searchUser };
