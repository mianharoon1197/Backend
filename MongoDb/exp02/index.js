import express from "express";

const app = express();
import { MongoClient, ObjectId } from "mongodb";

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
      resp.status(200).send(data);
    } catch (error) {
      console.log("Failed to get data from db", error);
      resp.status(500).send({ error: "Failed to fetch Data!" });
    }
  });

  //delete data from db
  app.delete("/deleteData/:id", async (req, resp) => {
    try {
      const id = req.params.id;
      const result = await collection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 1) {
        console.log("Data Deleted");
        resp.status(200).send({ message: "User Deleted Successfully" });
      } else {
        resp.status(404).send({ message: "No User Found" });
      }
    } catch (error) {
      console.log("Error Deleting Data from DB: ", error);
      resp.status(500).send({ error: "Failed to Delete User" });
    }
  });
});

app.listen(1197, () => {
  console.log("Sever is running at 1197");
});
