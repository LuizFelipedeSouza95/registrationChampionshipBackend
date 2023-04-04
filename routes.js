const express = require("express");
//const { prismaClient } = require("./src/model/prismaClient");
const path = require("path");
//const urlencoded = express.urlencoded({ extended: true });
const app = express();
const router = express.Router();

const { createUsers } = require("./src/controllers/createUsers");
const { searchUser } = require("./src/controllers/searchOneUser");
const { searchAllUsers } = require("./src/controllers/searchAllUsers");
const { classifications } = require("./src/controllers/classifications");
const { searchAllClassification } = require("./src/controllers/searchAllClassification");
const { updateTableClassification } = require("./src/controllers/updateTableClassification")
const { createRoudeds } = require("./src/controllers/createRoudeds")
const { searchAllRouded } = require("./src/controllers/searchAllRouded")
const { updatedTableRouded } = require("./src/controllers/updatedGameRouded")
const { createTeams } = require("./src/controllers/createTeams")
const { searchAllTeams } = require("./src/controllers/searchAllTeams")

const createUser = new createUsers();
const searchUserObj = new searchUser();
const searchAllUsersObj = new searchAllUsers();
const Classification = new classifications();
const searchAllClassifications = new searchAllClassification();
const updateClassification = new updateTableClassification()
const createRouded = new createRoudeds()
const searchAllRoudeds = new searchAllRouded()
const updatedTableRoudeds = new updatedTableRouded()
const createTeam = new createTeams()
const searchAllTeam = new searchAllTeams()

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views/pages"));

router.post("/updatedGameRounds", updatedTableRoudeds.updatedTableRouded)
router.get("/searchAllRouded", searchAllRoudeds.searchAllRouded)
router.post("/createRouded", createRouded.createRoudeds)
router.post("/createUser", createUser.createUsers.bind(createUser));
router.get("/searchUser", searchUserObj.searchUser.bind(searchUserObj));
router.get("/searchAllUser", searchAllUsersObj.searchAllUsers.bind(searchAllUsersObj));
router.post("/saveClassification", Classification.classifications)
router.get("/searchAllClassification", searchAllClassifications.searchAllClassification)
router.post("/updateTableClassification", updateClassification.updateTableClassification )
router.post("/createTeam", createTeam.createTeams )
router.get("/searchAllTeam", searchAllTeam.searchAllTeams )

module.exports = { router };
