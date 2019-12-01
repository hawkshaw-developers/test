var express = require("express");
var path = require("path");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://admin:admin@cluster0-zb3wd.mongodb.net/test?retryWrites=true&w=majority";
const ObjectID = require('mongodb').ObjectID;

router.get("/getMenu", function (req, res) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  client.connect(err => {
    const collection = client.db("test").collection("Menu");
    // perform actions on the collection object
    collection.find().toArray(function (err, items) {
      if (err) throw err;
      res.json(items);
    });
    client.close();
  });
});

router.post("/addMenu", function (req, res) {
  var item = {
    name: req.body.name,
    price: req.body.price,
    code: req.body.code == undefined ? "GEN" : req.body.code,
    status: "Active"
  };
  console.log(item);
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  client.connect(err => {
    const collection = client.db("test").collection("Menu");
    // perform actions on the collection object
    collection.insert(item, function (err, resl) {
      if (err) throw err;
      res.send("success");
    });
    client.close();
  });
});

router.post("/updateMenu", function (req, res) {
  console.log(req.body.id + " " + req.body.name);

  var item = {};
  if (req.body.name != undefined) {
    item.name = req.body.name;
  }
  if (req.body.code != undefined) {
    item.code = req.body.code;
  }
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  if (req.body.price == undefined) {
    console.log("Item Update");
    client.connect(err => {
      const collection = client.db("test").collection("Menu");
      collection.findOneAndUpdate({ "_id": ObjectID(req.body.id) }, { $set: item }, { upsert: false }, function (err, resl) {
        if (err) throw err;
        res.send("Success");
      });
      client.close();
    });
  }
  else {
    console.log("Item Add and Update");
    item.price = req.body.price;
    client.connect(err => {
      const collection = client.db("test").collection("Menu");
      collection.findOneAndUpdate({ "_id": ObjectID(req.body.id) }, { $set: { status: "Deleted" } }, { upsert: false }, function (err, resl) {
        if (err) throw err;
        if (item.name == undefined) {
          item.name = resl.value.name;
        }
        if (item.code == undefined) {
          item.code = resl.value.code;
        }
        item.status = "Active";
        console.log(item);
        collection.insertOne(item, (err, resl) => {
          if (err) throw err;
          res.send("success")
        });
        client.close();
      });


    });
  }

});

router.get("/populateDefaultMenu", function (req, res) {
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
        console.log(dataArr);
        const client = new MongoClient(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        client.connect(err => {
          const collection = client.db("test").collection("Menu");
          dataArr.forEach((item) => collection.insert({ name: item[0], rate: item[1], code: item[2] }));

        });
        client.close();
        reader.setProperty("app.properties", "isDefaultMenuPopulated", "true");
      });
  }
});
router.post("/addMenuFile", function (req, res) { });
module.exports = router;
