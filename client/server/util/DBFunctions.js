const MongoClient = require("mongodb").MongoClient;
const uri =
    "mongodb+srv://admin:admin@cluster0-zb3wd.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

exports.getMonthlySales = function (date) {
    console.log("came to monthy sales");
    client.connect(err => {
        const collection = client.db("test").collection("Bill");
        collection.aggregate([{ $group: { _id: null, "TotalAmount": { $sum: "$Total" } } }], function (err, res) {
            if (err) { console.log(err); }
            else {
                console.log(res);
                console.log(res.TotalAmount);

                return res.TotalAmount;
            }
        });


    });
}