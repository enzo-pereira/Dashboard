const express = require("express");
const { detectNewMail, detectUserMail } = require("./gmail");
const { google } = require('googleapis');

const gmail = express();

gmail.get("/api/google/gmail", async (req, res) => {
  try {
    const lastEmailDate = new Date(await detectNewMail());
    lastEmailDate.setHours(lastEmailDate.getHours() + 1);
    const formattedDate = lastEmailDate.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})
    console.log("Last email received on:", formattedDate);
    res.send(formattedDate.toLowerCase().replace(/\b(\w)/g, (match) => match.toUpperCase()));
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

gmail.post("/api/google/usergmail", async (req, res) => {
  try {
    const Usermail = await detectUserMail(req.body.num);
    console.log(Usermail)
    res.send(Usermail);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = { gmail };