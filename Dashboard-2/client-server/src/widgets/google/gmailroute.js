const express = require("express");
const { detectNewMail } = require("./gmail")
const { google } = require('googleapis');

const gmail = express();

gmail.get("/api/google/gmail", async (req, res) => {
  const lastEmailDate = await detectNewMail();
  console.log("Last email received on:", lastEmailDate);
  res.send(lastEmailDate);
});

module.exports = { gmail }