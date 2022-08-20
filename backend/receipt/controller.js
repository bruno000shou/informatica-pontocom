const express = require("express");
const router = express.Router();
const fs = require("fs");
const receiptMoviments = require("../../dbReceipt.json");

router.get("/", (req, res) => {
  return res.json(receiptMoviments);
});

router.put("/", (req, res) => {
  let json = receiptMoviments;
  let body = req.body;
  json.receipt = body;
  writePost(json);
  return res.send(json);
});

router.post("/", (req, res) => {
  let json = regMoviments;
  let body = req.body;
  json.receipt.push(body);
  writePost(json);
  return res.send(json);
});

function writePost(json) {
  fs.writeFile("../dbReceipt.json", JSON.stringify(json), (err) => {
    if (err) throw err;
    console.log("Done writing");
    console.log(json);
  });
}

module.exports = router;
