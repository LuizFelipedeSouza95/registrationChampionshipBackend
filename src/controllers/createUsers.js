const { prismaClient } = require('../model/prismaClient');
const bcrypt = require("bcrypt");

class createUsers {
  async createUsers(req, res) {
    try {
      const { name, email, password, admin } = req.body;
      
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const getEmail = await prismaClient.users.findFirst({
        where: {
          email: email,
        },
      });

      if (getEmail) {
        return res.status(409).json({ message: "Email Already exists!" });
      } else {
        const users = await prismaClient.users.create({
          data: {
            name,
            email,
            password: hash,
            admin
          },
        });
        return res.status(201).json(users);
      }
    } catch (error) {
      console.log(error);
      return res.status(404).json("insertion error!");
    }
  }
}

module.exports = { createUsers };