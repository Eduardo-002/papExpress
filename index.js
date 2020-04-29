const PORT = process.argv[process.argv.findIndex((elem)=>elem=='-p')+1] || 8080;
const path = require('path');
const firebase = require('firebase');
var bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

const router = require('./router.js');

require('firebase/firestore');
firebase.initializeApp({
  apiKey: "AIzaSyBdQoH1N7z5Wo79QUUOBa3GkIpYczYGB7g",
  authDomain: "treinadorbancada-79ea9.firebaseapp.com",
  databaseURL: "https://treinadorbancada-79ea9.firebaseio.com",
  projectId: "treinadorbancada-79ea9",
  storageBucket: "treinadorbancada-79ea9.appspot.com",
  messagingSenderId: "238339926937",
  appId: "1:238339926937:web:d2a8d28be7198822104108"
});

const routerInputs = {app,firebase,express,path,PORT};
router.set(routerInputs);


//https://startbootstrap.com/previews/sb-admin-2/

//npx nodemon index -p 8080