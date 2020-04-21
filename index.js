
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
  apiKey: "AIzaSyAt7jG7uuoAu9AV8pWzHnh9Izlh31lbXV0",
  authDomain: "pap1-369f6.firebaseapp.com",
  databaseURL: "https://pap1-369f6.firebaseio.com",
  projectId: "pap1-369f6",
  storageBucket: "pap1-369f6.appspot.com",
  messagingSenderId: "699724819078",
  appId: "1:699724819078:web:a15f45b5863546d0b6ff07"
});

router.routes.forEach(route => {
  if(route.method=='get')app.get(route.path,route.action);
  else if(route.method=='post')app.post(route.path,route.action);
});

app.use('/static', express.static(path.join(__dirname, 'static')))

app.listen(PORT,()=>console.log('Server is runing on http://localhost:'+PORT));

//https://startbootstrap.com/previews/sb-admin-2/