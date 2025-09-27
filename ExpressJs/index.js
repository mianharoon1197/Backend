//const express = require('express')//old way used in vanila js

import express from 'express'
// new using in ECMA 6 

import home from './pages/home.js'
import about from './pages/about.js'
import contact from './pages/contact.js'
const app = express()

app.get("/",(req,resp)=>{
    //resp.write('<h1>Hello from Express Harry</h1>')
     resp.send(home())
})

app.get("/about",(req,resp)=>{
   // resp.write('<h1>Tell me about Yourself</h1>')
   resp.send(about())
})

app.get("/contact",(req,resp)=>{
    //resp.write('<h1>Contact me at abc@gmail.com</h1>')
     resp.send(contact())
})

app.listen(1100)