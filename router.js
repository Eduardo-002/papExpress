(function(){
  const login = require('./src/Login/Login.js');
  const database = require('./src/Dashboard/Database/Database.js');
  let app,firebase,express,path,PORT;
  const set = (routerInputs) => {
    app = routerInputs.app;
    firebase = routerInputs.firebase;
    express = routerInputs.express;
    path = routerInputs.path;
    PORT = routerInputs.PORT;

    app.get('/',(req,res)=>res.redirect('/dashboard'));
    app.get('/login',(req,res)=>res.sendFile(path.join(__dirname,'/public','/Login/login.html')));
    app.get('/regist',(req,res)=>res.sendFile(path.join(__dirname,'/public','/Login/regist.html')));
    app.get('/dashboard',(req,res)=>checkLogin({firebase,req,res},()=>res.sendFile(path.join(__dirname,'/public','/Dashboard/dashboard.html'))));
    app.get('/dashboard/blank2',(req,res)=>checkLogin({firebase,req,res},()=>res.sendFile(path.join(__dirname,'/public','/Dashboard/Pages/blank2.html'))));
    app.get('/dashboard/classificacao',(req,res)=>checkLogin({firebase,req,res},()=>res.sendFile(path.join(__dirname,'/public','/Dashboard/Tabelas/classificacao.html'))));
    app.get('/dashboard/jogadores',(req,res)=>checkLogin({firebase,req,res},()=>res.sendFile(path.join(__dirname,'/public','/Dashboard/Tabelas/jogadores.html'))));
    app.get('/dashboard/novidades',(req,res)=>checkLogin({firebase,req,res},()=>res.sendFile(path.join(__dirname,'/public','/Dashboard/Tabelas/novidades.html'))));

    app.post('/login',(req,res)=>{
      login.doLogin({firebase,req},(response)=>{
        if(response.logged){res.redirect('/dashboard');}
        else res.redirect('/login?error='+response.error);
      });
    })
    app.post('/regist',(req,res)=>{
      login.doRegist({firebase,req},(response)=>{
        if(response.registered){
          login.doLogin({firebase,req},(response)=>{
            if(response.logged)res.redirect('/dashboard');
            else res.redirect('/login?error='+response.error);
          });
        }
        else res.redirect('/regist?error='+response.error);
      })
    })
    app.post('/logout',(req,res)=>{
      login.doLogout({firebase,req},(response)=>{
        if(response.loggedOut)res.redirect('/login');
        else res.redirect('/login?error='+response.error);
      })
    })
    app.post('/database/classificacao',(req,res)=>{database.get({firebase,table:'Classificacao'},({response})=>{res.send(response);})})
    app.post('/database/jogadores',(req,res)=>{database.get({firebase,table:'Jogadores'},({response})=>{res.send(response);})})

    app.use('/static', express.static(path.join(__dirname, 'static')))

    app.listen(PORT,()=>console.log('Server is runing on http://localhost:'+PORT));
  }

  const checkLogin = ({firebase,req,res},callback) => {
    let done = false;
    login.checkLogged({firebase},(response)=>{
      if(!done){
        if(!response.logged)res.redirect('/login')
        else {done=true;callback();}
      }
    })
  }
  
  module.exports.set = set;
}())