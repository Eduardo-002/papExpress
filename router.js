const firebase = require('firebase');
const path = require('path');

const login = require('./src/Login/Login.js');
const dashboard = require('./src/Dashboard/Dashboard.js');

(function(){
  const routes = [
    {
      name:'home',
      path:'/',
      method: 'get',
      action: (req,res)=>res.send('Hello World!')
    },
    {
      name:'login',
      path:'/login',
      method: 'get',
      action: (req,res)=>res.sendFile(path.join(__dirname,'/public','/Login/login.html'))
    },
    {
      name:'login',
      path:'/login',
      method: 'post',
      action: (req,res)=>login.handleLogin(firebase,req,res)
    },
    {
      name:'regist',
      path:'/regist',
      method: 'get',
      action: (req,res)=>res.sendFile(path.join(__dirname,'/public','/Login/Regist.html'))
    },
    {
      name:'regist',
      path:'/regist',
      method: 'post',
      action: (req,res)=>login.handleRegist(firebase,req,res)
    },
    {
      name:'dashboard',
      path:'/dashboard',
      method: 'get',
      action: /*(req,res)=>dashboard.start(firebase,req,res,*/(req,res)=>res.sendFile(path.join(__dirname,'public','/Dashboard/dashboard.html'))
    },
    {
      name:'dashButtons',
      path:'/dashboard/buttons',
      method:'get',
      action: (req,res)=>res.sendFile(path.join(__dirname,'public','Dashboard/Components/buttons.html'))
    }
  ];

  module.exports.routes = routes;
}())