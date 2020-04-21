(function(){
  const handleLogin = (firebase,req,res) => {
    const loginData = {
      email: req.body.email,
      password: req.body.password
    }
    console.log(req.body);
    doLogin(firebase,loginData.email,loginData.password,(log)=>{
      if(log.logged)res.redirect('/dashboard');
    })
  }
  const doLogin = async (firebase,email,password,callback) => {
    await firebase.auth()
      .signInWithEmailAndPassword(email,password)
        .then(()=>{
          callback({logged:true});
      },err=>{
        callback({err:err});
      })
  }

  const handleRegist = (firebase,req,res) => {
    const registData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    }
    if(registData.password!=registData.confirmPassword){res.redirect('/regist');return;}

    doRegist(firebase,registData,(log)=>{
      console.log(log);
      if(log.err){res.send(log.err);return;}
      doLogin(firebase,log.email,log.password,(log)=>{
        if(log.logged)res.redirect('/dashboard');
      })
      //if(log.logged)res.redirect('/dashboard');
    })
  }
  const doRegist = (firebase,registData,callback) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(registData.email,registData.password)
      .then(authRes => {
        const userObj = {
          email: registData.email,
          firstName: registData.firstName,
          lastName: registData.lastName
        };
        firebase
          .firestore()
          .collection('users')
          .doc(registData.email)
          .set(userObj)
          .then(()=>{
            callback({email:registData.email,password:registData.password});
          }, dbErr => {
            callback({err:dbErr});
          })
      }, authErr => {
        callback({err:authErr});
      })
  }
  
  module.exports.handleLogin = (firebase,req,res) => handleLogin(firebase,req,res);
  module.exports.handleRegist = (firebase,req,res) => handleRegist(firebase,req,res);

}());

