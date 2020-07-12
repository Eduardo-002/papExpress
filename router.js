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

    app.get('/dashboard',(req,res)=>checkLogin({firebase,req,res},()=>res.sendFile(path.join(__dirname,'/public','/Dashboard/Dashboard.html'))));
    
    app.get('/dashboard/blank',(req,res)=>checkLogin({firebase,req,res},()=>res.sendFile(path.join(__dirname,'/public','/Dashboard/Pages/blank.html'))));
    app.get('/dashboard/blank2',(req,res)=>checkLogin({firebase,req,res},()=>res.sendFile(path.join(__dirname,'/public','/Dashboard/Pages/blank2.html'))));
    app.get('/dashboard/embreve',(req,res)=>checkLogin({firebase,req,res},()=>res.sendFile(path.join(__dirname,'/public','/Dashboard/Pages/embreve.html'))));
    
    app.get('/dashboard/user',(req,res)=>checkLogin({firebase,req,res},()=>res.sendFile(path.join(__dirname,'/public','/Dashboard/User/user.html'))));
    
    app.get('/dashboard/proximo',(req,res)=>checkLogin({firebase,req,res},()=>res.sendFile(path.join(__dirname,'/public','/Dashboard/proximo.html'))));

    app.get('/dashboard/resultado',(req,res)=>checkLogin({firebase,req,res},()=>res.sendFile(path.join(__dirname,'/public','/Dashboard/Apostas/resultado.html'))));
    app.get('/dashboard/inicial',(req,res)=>checkLogin({firebase,req,res},()=>res.sendFile(path.join(__dirname,'/public','/Dashboard/Apostas/inicialv2.html'))));
    //app.get('/dashboard/historico',(req,res)=>checkLogin({firebase,req,res},()=>res.sendFile(path.join(__dirname,'/public','/Dashboard/Apostas/historico.html'))));
    
    app.get('/dashboard/classificacao',(req,res)=>checkLogin({firebase,req,res},()=>res.sendFile(path.join(__dirname,'/public','/Dashboard/Tabelas/classificacao.html'))));
    app.get('/dashboard/jogadores',(req,res)=>checkLogin({firebase,req,res},()=>res.sendFile(path.join(__dirname,'/public','/Dashboard/Tabelas/jogadores.html'))));
    app.get('/dashboard/novidadesold',(req,res)=>checkLogin({firebase,req,res},()=>res.sendFile(path.join(__dirname,'/public','/Dashboard/Tabelas/novidades.html'))));
    app.get('/dashboard/novidades',(req,res)=>checkLogin({firebase,req,res},()=>res.sendFile(path.join(__dirname,'/public','/Dashboard/Tabelas/novidadesNew.html'))));

    app.get('/dashboard/loja',(req,res)=>checkLogin({firebase,req,res},()=>res.sendFile(path.join(__dirname,'/public','/Dashboard/Clube/loja.html'))));
    app.get('/dashboard/socios',(req,res)=>checkLogin({firebase,req,res},()=>res.sendFile(path.join(__dirname,'/public','/Dashboard/Clube/socios.html'))));

    app.get('/dashboard/historia',(req,res)=>checkLogin({firebase,req,res},()=>res.sendFile(path.join(__dirname,'/public','/Dashboard/Acerca/historia.html'))));
    app.get('/dashboard/mourisquense',(req,res)=>checkLogin({firebase,req,res},()=>res.sendFile(path.join(__dirname,'/public','/Dashboard/Acerca/mourisquense.html'))));

    app.post('/login',(req,res)=>{
      login.doLogin({firebase,req},(response)=>{
        console.log(response);
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

    app.post('/database/user',(req,res)=>{login.checkLogged({firebase,req,res},()=>{database.getUserData({firebase},({response})=>{res.send(response);})})})
    app.post('/database/user/set',(req,res)=>{login.checkLogged({firebase,req,res},()=>{database.setUserData({firebase,req},({response})=>{res.send(response);})})})
    app.post('/database/notificacoesRemove',(req,res)=>{login.checkLogged({firebase,req,res},()=>{database.removeNotification({firebase,req},({response})=>{res.send(response);})})})

    app.post('/database/proximo',(req,res)=>{login.checkLogged({firebase,req,res},()=>{database.getProximo({firebase},({response})=>{res.send(response);})})})

    app.post('/database/proximos',(req,res)=>{login.checkLogged({firebase,req,res},()=>{database.getProximos({firebase},({response})=>{res.send(response);})})})
    app.post('/database/club/getJogadores',(req,res)=>{login.checkLogged({firebase,req,res},()=>{database.getJogadoresV2({firebase},({response})=>{res.send(response);})})})
    app.post('/database/user/resultado/apostas',(req,res)=>{login.checkLogged({firebase,req,res},()=>{database.getApostasResultados({firebase,req},({response})=>{res.send(response);})})})
    app.post('/database/user/inicial/apostas',(req,res)=>{login.checkLogged({firebase,req,res},()=>{database.getInicial({firebase,req},({response})=>{res.send(response);})})})
    app.post('/database/user/inicial/apostar',(req,res)=>{login.checkLogged({firebase,req,res},()=>{database.setInicial({firebase,req},({response})=>{res.send(response);})})})
    app.post('/database/user/fazerAposta',(req,res)=>{login.checkLogged({firebase,req,res},()=>{database.fazerAposta({firebase,req},({response})=>{res.send(response);})})})

    app.post('/database/classificacao',(req,res)=>{login.checkLogged({firebase,req,res},()=>{database.getClassificacao({firebase},({response})=>{res.send(response);})})})
    app.post('/database/jogadores',(req,res)=>{database.getJogadoresV2({firebase},({response})=>{res.send(response);})})
    app.post('/database/novidades',(req,res)=>{database.getNoticias({firebase},({response})=>{res.send(response);})})
    app.post('/database/comentarios',(req,res)=>{database.getComentarios({req,firebase},({response})=>{res.send(response);})})

    app.use('/static', express.static(path.join(__dirname, 'static')))

    app.listen(PORT,/*'192.168.1.100',*/()=>console.log('Server is runing on http://localhost:'+PORT));
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