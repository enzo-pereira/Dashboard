const express = require("express");
const { detectNewMail } = require("./gmail")
const { google } = require('googleapis');

const gmail = express();
gmail.get("/api/google/gmail", async (req, res) => {
  const lastEmailDate = new Date(await detectNewMail());
  lastEmailDate.setHours(lastEmailDate.getHours() + 1);
  const formattedDate = lastEmailDate.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})
  console.log("Last email received on:", formattedDate);
  res.send(formattedDate.toLowerCase().replace(/\b(\w)/g, (match) => match.toUpperCase()));
});

module.exports = { gmail }