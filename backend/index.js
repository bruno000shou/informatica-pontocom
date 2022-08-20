const express = require("express");
const server = express();
const cors = require("cors");
const dailyListController = require("./dailyList/controller");
const regClientController = require("./regClient/controller");
const receiptController = require("./receipt/controller");

server.use(cors());
server.use(express.json());

server.use("/dailyList", dailyListController);
server.use("/regClient", regClientController);
server.use("/receipt", receiptController);

server.listen(5000, function() {
  console.log("Servidor funcionando...");
});
