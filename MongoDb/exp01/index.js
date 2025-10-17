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
//middleware to get data here when we submit
app.use(express.json())
//for ejs templates
app.set("view engine", "ejs");

// //making api to get data
// app.get("/", async (req, resp) => {
//   await Client.connect();
//   const db = Client.db(dbName);
//   const collection = db.collection(collectionName);

//   const students = await collection.find().toArray();
//   resp.render('students',{students})
//   console.log(students);
// });

// ================ another way to make api========================
//======  modern way
Client.connect().then((connection) => {
  const db = connection.db(dbName);

  //it always need await as it is fetching data
  app.get("/api", async (req, resp) => {
    const collection = db.collection(collectionName);
    const students = await collection.find().toArray();
    resp.send(students);
  });

  app.get("/ui", async (req, resp) => {
    const collection = db.collection(collectionName);
    const students = await collection.find().toArray();
    resp.render("students", { students });
  });

  app.post("/sendData",(req,resp)=>{
    console.log(req.body)
    resp.send({'message': req.body})
  })
});

app.listen(3200, () => {
  console.log("Server Running at port 3200");
});
