//const express = require('express')//old way used in vanila js

import express from "express";
// new using in ECMA 6

import home from "./pages/home.js";
import about from "./pages/about.js";
import contact from "./pages/contact.js";
const app = express();

//global or application midleware
//applied to all pages/routes
function ageCheck(req, resp, next) {
  if (!req.query.age || req.query.age < 18) {
    resp.send("<h1>You Cannot acces this page</h1>");
  } else {
    next();
  }
}

//route middleware applied on selected routes not all
function urlCheck(req, resp, next) {
  console.log("Requested Url: ", req.url);
  next()
}
app.use(ageCheck);

app.get("/", (req, resp) => {
  //resp.write('<h1>Hello from Express Harry</h1>')
  resp.send(home());
});

app.get("/about", (req, resp) => {
  // resp.write('<h1>Tell me about Yourself</h1>')
  resp.send(about());
});

//here route middle ware applied
app.get("/contact",urlCheck, (req, resp) => {
  //resp.write('<h1>Contact me at abc@gmail.com</h1>')
  resp.send(contact());
});

app.listen(1100, () => {
  console.log("Server started at port 1100");
});
