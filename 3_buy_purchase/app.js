var gamerocket = require("gamerocket");
var express = require("express");
var app = express();
var ejs = require('ejs');

app.use(express.bodyParser());

var gateway = gamerocket.connect({
  environment: gamerocket.Environment.Development,
  apiKey: "your_api_key",
  secretKey: "your_secret_key"
});

app.get("/", function (req, res) {
  res.render("form.ejs");
});

app.post("/create_player", function (req, res) {
  gateway.player.create(
    { name: req.body.name, locale: req.body.locale },
    function (err, result) {
      if (result) {
        res.send("<h1>Success! Player ID: " + result.player.id + "</h1>");
      } else {
        res.send("<h1>Error:  " + err.error_description + "</h1>");
      }
    }
  );
});

app.get("/run_action", function (req, res) {
  gateway.action.run(
    "hello-world",
    { 
      player: "<use_player_id>",
      name: req.query.name
    },
    function (err, result) {
      if (result) {
        res.send("<h1>Success!" + result.data["hello"] + "</h1>");
      } else {
        res.send("<h1>Error:  " + err.error_description + "</h1>");
      }
    }
  );
});

app.get("/unlock-content", function (req, res) {
  gateway.purchase.buy(
    "unlock-content",
    { player: "your_player_id" },
    function (err, result) {
      if (result) {
        res.send("<h1>Success!" + result.data["message"] + "</h1>");
      } else {
        res.send("<h1>Error:  " + err.error_description + "</h1>");
      }
    }
  );
});

app.listen(3000);

