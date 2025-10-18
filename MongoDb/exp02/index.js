import express from "express";

const app = express();
import { MongoClient } from "mongodb";

const dbName = "harry";
const collectionName = "practice";
//local url
const url = "mongodb://localhost:27017";

//connecting to host
const Client = new MongoClient(url);

app.use(express.json());

Client.connect().then((connection) => {
  console.log("DB Connected!");

  const db = connection.db(dbName);
  const collection = db.collection(collectionName);

  //inserting data to db
  app.post("/submitData", async (req, resp) => {
    try {
      console.log("Received Data: ", req.body);

      const result = await collection.insertOne(req.body);

      resp.status(201).send({
        message: "Data Inserted Successfuly!",
        data: req.body,
        insertedId: result.insertedId,
      });
    } catch (error) {
      console.log(error);
      resp.status(500).send({ error: "Database insertion failed!" });
    }
  });

  app.get("/getData", async (req, resp) => {
    try {
      const data = await collection.find().toArray();
      resp.send(data);
    } catch (error) {
      console.log(error);
      resp.status(500).send({ error: "Failed to fetch Data!" });
    }
  });
});

app.listen(1197, () => {
  console.log("Sever is running at 1197");
});
