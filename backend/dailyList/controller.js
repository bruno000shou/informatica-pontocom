const express = require("express");
const router = express.Router();
const fs = require("fs");
const posMoviments = require("../../dbPos.json");

router.get("/", (req, res) => {
  return res.json(posMoviments);
});

router.put("/", (req, res) => {
  let json = posMoviments;
  let body = req.body;
  json.dailyList = body;
  writePost(json);
  return res.send(json);
});

router.post("/", (req, res) => {
  let json = posMoviments;
  let body = req.body;
  json.dailyList.push(body);
  writePost(json);
  return res.send(json);
});

function writePost(json) {
  fs.writeFile("../dbPos.json", JSON.stringify(json), (err) => {
    if (err) throw err;
    console.log("Done writing");
    console.log(json);
  });
}

module.exports = router;
