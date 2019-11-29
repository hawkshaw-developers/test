var express = require("express");
var bodyParser = require("body-parser");

var menuRoute = require("./menu/menuRouter.js");
var billRoute = require("./bill/billRouter.js");
var app = express();

app.get("/", function(req, res) {
  res.send("Welcome to Hotel Management!");
});

app.use(express.json({ limit: "1mb" }));

app.use("/menu", menuRoute);

app.use("/bill", billRoute);

app.listen(process.env.PORT || 5000);
