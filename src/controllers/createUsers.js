const { prismaClient } = require("../model/prismaClient");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');

class createUsers {
  async createUsers(req, res) {
    try {
      const { name, email, password, team, admin } = req.body;

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

        const getUserName = await prismaClient.users.findFirst({
          where: {
            name: name,
          },
        });

        if (getUserName) {
          return res.status(409).json({ message: "Username already exists!" });
        } 

        const users = await prismaClient.users.create({
          data: {
            name,
            email,
            password: hash,
            team: team,
            admin,
          },
        });
        const getName = await prismaClient.users.findMany({
          where: {
            email: email,
          }
        })
        const getNameTeam = await prismaClient.teams.findMany({
          where: {
            id: team
          }
        });
        const classification = await prismaClient.classification.create({
          data: {
            team: team,
            teamPlayer: getNameTeam[0].name,
            J: 0,
            P: 0,
            V: 0,
            E: 0,
            D: 0,
            GP: 0,
            GC: 0,
            SG: 0,
            name: getName[0].name,
          },
        });
        const updatedTeam = await prismaClient.teams.update({
          where: {
            id: team,
          },
          data: {
            select: true,
            nameUser: name
          },
        });
        const user = await prismaClient.users.findMany({
          where: {
            email: email,
          },
          include: {
            classifications: true,
            teamUser: true
          },
        });
        return res.status(201).json(user);
      }
    } catch (error) {
      console.log(error);
      return res.status(404).json("insertion error!");
    }
  }
}

module.exports = { createUsers };
