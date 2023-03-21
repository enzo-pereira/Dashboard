const { google } = require("googleapis");
const express = require("express");
// const User  = require("../config/interface.User");
// const detectNewMail = require("../services/google/gmail");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
// const userInfo = require("os");
// const axios = require("axios");

const prisma = new PrismaClient();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

const secretKey = "secret-key";

const googleOauth = express();

googleOauth.get("/google-url", async (_req, res) => {
  const url = oauth2Client.generateAuthUrl({
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/gmail.readonly",
    ],
    include_granted_scopes: true,
  });
  res.status(200).send(url);
});

googleOauth.get("/auth/google/callback", async function (req, res) {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const ticket = await oauth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log(payload);
    const email = payload?.email;
    const data = {
      email: email,
      password: "",
      id: undefined,
    };
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      const user = await prisma.user.create({
        data: {
          email: email,
          token: {
            create: {
              accessToken: tokens.access_token,
            },
          },
        },
      });
      console.log("create");
      const tokenjwt = jwt.sign(
        {
          userId: user.id,
        },
        secretKey,
        {
          expiresIn: "7d",
        }
      );
      res.status(200).send(tokenjwt);
    }
    res.status(200).send("ok");
  } catch (err) {
    console.error(err);
  }
});


module.exports = { googleOauth, oauth2Client };
