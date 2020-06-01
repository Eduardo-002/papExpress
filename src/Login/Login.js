(function(){
  const checkLogged = ({firebase},callback) => {
    firebase.auth().onAuthStateChanged((user)=>{
      if(!user)callback({logged:false});
      else callback({logged:true,email:user.email});
    })
  }

  const doLogin = ({firebase,req},callback) => {
    const email = req.body.email;
    const password = req.body.password;

    firebase.auth().signInWithEmailAndPassword(email,password)
      .then(()=>{
        callback({logged:true});
      },err=>{
        callback({error:err});
      })
  }

  const doRegist = ({firebase,req},callback) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if(password!=confirmPassword)callback({error:'password does not match'});

    firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(response=>{
        callback({registered:true});
      },err=>{
        callback({error:err});
      })
  }

  const doLogout = ({firebase,req},callback) => {
    firebase.auth().signOut()
      .then((response)=>{
        callback({loggedOut:true});
      },err=>{
        callback({error:err});
      })
  }

  module.exports.doLogin = doLogin;
  module.exports.doRegist = doRegist;
  module.exports.doLogout = doLogout;
  module.exports.checkLogged = checkLogged;
}());

