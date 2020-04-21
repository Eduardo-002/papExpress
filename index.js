
const PORT = process.argv[process.argv.findIndex((elem)=>elem=='-p')+1] || 8080;
const path = require('path');
const firebase = require('firebase');
var bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

const login = require('./src/Login/Login.js');

require('firebase/firestore');
firebase.initializeApp({
  apiKey: "AIzaSyAt7jG7uuoAu9AV8pWzHnh9Izlh31lbXV0",
  authDomain: "pap1-369f6.firebaseapp.com",
  databaseURL: "https://pap1-369f6.firebaseio.com",
  projectId: "pap1-369f6",
  storageBucket: "pap1-369f6.appspot.com",
  messagingSenderId: "699724819078",
  appId: "1:699724819078:web:a15f45b5863546d0b6ff07"
});

app.get('/', (req,res)=>res.send('Hello World!'));
app.get('/login', (req,res)=>res.sendFile(path.join(__dirname,'/public','/Login/Login.html')));
app.post('/login',(req,res)=>login.handleLogin(firebase,req,res));
app.get('/regist', (req,res)=>res.sendFile(path.join(__dirname,'/public','/Login/Regist.html')));
app.post('/regist',(req,res)=>login.handleRegist(firebase,req,res));

app.listen(PORT,()=>console.log('Server is runing on http://localhost:'+PORT));