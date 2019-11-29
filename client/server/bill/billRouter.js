var express = require("express");

var router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://admin:admin@cluster0-zb3wd.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

router.post("/addBill", function(req, res) {
  client.connect(err => {
    const collection = client.db("test").collection("Bill");
    var item = {
      Items: req.body.item,
      Quantity: req.body.quan,
      Added_Time: Date.now(),
      Total: req.body.total
    };

    collection.insertOne(item, function(err, resl) {
      if (err) throw err;
    });
  });
  res.send("Updated Successfully");
});

router.get("/getBill", function(req, res) {
  console.log("Came here");
  client.connect(err => {
    const collection = client.db("test").collection("Bill");
    collection.find().toArray(function(err, items) {
      if (err) throw err;

      items.map((item, index) => {
        var at = new Date(item.Added_Time);
        var hr = at.getHours();
        var time =
          (hr > 12 ? hr - 12 : hr) +
          ":" +
          (at.getMinutes() < 10 ? "0" + at.getMinutes() : at.getMinutes()) +
          " " +
          (hr < 12 ? "AM" : "PM");
        var date =
          at.getDate() + "-" + (at.getMonth() + 1) + "-" + at.getFullYear();
        console.log(date + " " + time);
        item.Added_Time = date + " " + time;
        items[index] = item;
      });
      res.json(items);
    });
  });
});
module.exports = router;
