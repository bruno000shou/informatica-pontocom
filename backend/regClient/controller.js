const express = require("express");
const router = express.Router();
const fs = require("fs");
const regMoviments = require("../../dbRegClient.json");

router.get("/", (req, res) => {
  return res.json(regMoviments);
});

router.put("/", (req, res) => {
  let json = regMoviments;
  let body = req.body;
  json.regClient = body;
  writePost(json);
  return res.send(json);
});

router.post("/", (req, res) => {
  let json = regMoviments;
  let body = req.body;
  json.regClient.push(body);
  writePost(json);
  return res.send(json);
});

function writePost(json) {
  fs.writeFile("../dbRegClient", JSON.stringify(json), (err) => {
    if (err) throw err;
    console.log("Done writing");
    console.log(json);
  });
}

module.exports = router;
