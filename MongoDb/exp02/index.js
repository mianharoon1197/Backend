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

  app.get("/", (req, resp) => {
    resp.send("API is working");
  });

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
  // get all users from db
  app.get("/getData", async (req, resp) => {
    try {
      const data = await collection.find().toArray();
      resp.status(200).send(data);
    } catch (error) {
      console.log("Failed to get data from db", error);
      resp.status(500).send({ error: "Failed to fetch Data!" });
    }
  });

  //get only 1 user from db on basis of id
  app.get("/getData/:id", async (req, resp) => {
    const id = req.params.id;
    try {
      const data = await collection.findOne({ _id: new ObjectId(id) });
      resp.status(200).send({
        message: "Data Fecthed",
        data: data,
      });
    } catch (error) {
      console.log("Failed to get a user from db", error);
      resp.status(500).send({ error: "Failed to fetch User!" });
    }
  });

  //delete data from db
  app.delete("/deleteData/:id", async (req, resp) => {
    try {
      const id = req.params.id;
      const result = await collection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 1) {
        console.log("Data Deleted From Db: ", result);
        resp.status(200).send({ message: "User Deleted Successfully" });
      } else {
        resp.status(404).send({ message: "No User Found" });
      }
    } catch (error) {
      console.log("Error Deleting Data from DB: ", error);
      resp.status(500).send({ error: "Failed to Delete User" });
    }
  });

  // update a user in db on basis if id
  app.put("/updateData/:id", async (req, resp) => {
    try {
      const id = req.params.id;

      //const update = req.body;
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: req.body } //data to update on basis of abv id
      );
      if (result.matchedCount === 0) {
        return resp.status(404).send({ message: "User Not Found" });
      } else {
        return resp
          .status(200)
          .send({ message: "User Updated Succesfully", result: req.body });
      }
    } catch (error) {
      console.log("Error Updating Data to DB: ", error);
      resp.status(500).send({ message: "Failed to Updated User" });
    }
  });
});

app.listen(1197, () => {
  console.log("Sever is running at 1197");
});
