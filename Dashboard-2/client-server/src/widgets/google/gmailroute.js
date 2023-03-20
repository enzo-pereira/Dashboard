const express = require("express");
const { detectNewMail } = require("./gmail")
const { google } = require('googleapis');

const gmail = express();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL,
);


gmail.get("/api/google/gmail", async () => {
  const gmailClientMessages = await detectNewMail(oAuth2Client);
  console.log(gmailClientMessages);
});

module.exports = { gmail }