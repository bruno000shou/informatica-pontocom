const express = require("express");
const server = express();
const cors = require("cors");
const dailyListController = require("./dailyList/controller");

server.use(cors());
server.use(express.json());

server.use("/dailyList", dailyListController);
//config controller

server.listen(5000, function () {
  console.log("Servidor funcionando...");
});
