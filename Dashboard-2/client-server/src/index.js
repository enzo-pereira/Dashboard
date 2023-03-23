const express = require("express");
const cors = require("cors");
const bodyParser  = require('body-parser');
const {googleOauth} = require("./Oauth2/GoogleAuth2");
const {auth} = require("./routes/auth/auth");
const {user} = require("./routes/user/user");
const {routerForecast} = require("./widgets/meteo/meteo");
const {gmail} = require("./widgets/google/gmailroute");
const { reddit } = require("./widgets/reddit/reddit");

require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(auth);
app.use(googleOauth);
app.use(user);
app.use(routerForecast);
app.use(gmail);
app.use(reddit);

app.get("/", (req, res) => {
  console.log(req.body)
  res.send("Healthy");
});


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});