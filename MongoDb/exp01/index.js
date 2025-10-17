import express from "express";
import { MongoClient } from "mongodb";

const dbName = "harry";
const collectionName = "practice";
//local url
const url = "mongodb://localhost:27017";

//connecting to host
const Client = new MongoClient(url);

// async function dbConnection() {
//   await Client.connect();
//   const db = Client.db(dbName);
//   const collection = db.collection(collectionName);

//   const result = await collection.find().toArray();
//   console.log(result);
// }

// dbConnection();

const app = express();

app.set("view engine","ejs")
//making api to get data 
app.get("/", async (req, resp) => {
  await Client.connect();
  const db = Client.db(dbName);
  const collection = db.collection(collectionName);

  const result = await collection.find().toArray();
  resp.render('students',{result})
  console.log(result);
});

app.listen(3200, () => {
  console.log("Server Running at port 3200");
});
