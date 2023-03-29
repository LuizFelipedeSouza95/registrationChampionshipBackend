const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const {router} = require('./routes');
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || "3000";

app.use(express.static("views"));
app.use(cors());
app.use(bodyParser.json());
app.use(router);

app.listen(PORT, async () => {
  console.info(`⚡️Server is running at http://localhost:${PORT}/home`);
});