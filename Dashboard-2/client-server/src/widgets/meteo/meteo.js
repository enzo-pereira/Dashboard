const axios = require("axios");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { isConnect } = require("../../middleware/middleware");

const prisma = new PrismaClient();

const routerForecast = express();

const WEATHER_API = process.env.WEATHER_API;

routerForecast.post("/forecast", isConnect, async (req, res) => {
  const insee = req.body.insee;
  await prisma.widget.create({
    data: {
      name: "Forecast",
      description: `${req.body.insee}, probapluie`,
      userId: req.user.userId,
    },
  });

  const forecast = await axios.get(
    `https://api.meteo-concept.com/api/forecast/daily/0?token=${WEATHER_API}&insee=${insee}`
  );
  console.log(forecast.data.forecast);
  const data = {
    name: forecast.data.city.name,
    probapluie: forecast.data.forecast.probarain,
  };
  res.status(200).send(data);
});

module.exports = { routerForecast };
