var express = require("express");
var path = require("path");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://admin:admin@cluster0-zb3wd.mongodb.net/test?retryWrites=true&w=majority";

router.get("/getMenu", function(req, res) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  client.connect(err => {
    const collection = client.db("test").collection("Menu");
    // perform actions on the collection object
    collection.find().toArray(function(err, items) {
      if (err) throw err;
      res.json(items);
    });
    client.close();
  });
});

router.post("/addMenu", function(req, res) {
  var item = {
    name: req.body.name,
    quantity: 0,
    price: req.body.price,
    code: req.body.code == undefined ? "GEN" : req.body.code
  };
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  client.connect(err => {
    const collection = client.db("test").collection("Menu");
    // perform actions on the collection object
    collection.insert(item, function(err, resl) {
      if (err) throw err;
      res.send("Updated Successfully");
    });
    client.close();
  });
});

router.get("/populateDefaultMenu", function(req, res) {
  var reader = require("../util/PropertyReader.js");
  console.log(path.join(__dirname, "../"));
  if (reader.getProperty("app.properties", "isDefaultMenuPopulated")) {
    res.send("Default Menu is already populated");
  } else {
    var csv = require("fast-csv");
    var dataArr = [];
    csv
      .parseFile(
        __dirname + reader.getProperty("app.properties", "defaultMenuFilePath")
      )
      .on("data", data => {
        dataArr.push(data);
      })
      .on("end", () => {
        res.json(dataArr);
        reader.setProperty("app.properties", "isDefaultMenuPopulated", "true");
      });
  }
});
router.post("/addMenuFile", function(req, res) {});
module.exports = router;
