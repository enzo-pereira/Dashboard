const express = require("express");
const { detectNewMail } = require("./gmail")
const { google } = require('googleapis');

const gmail = express();

gmail.get("/api/google/gmail", async (req, res) => {
  const gmailClientMessages = await detectNewMail();
  console.log(gmailClientMessages);
  res.send(gmailClientMessages)
});

module.exports = { gmail }