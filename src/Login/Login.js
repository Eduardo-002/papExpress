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
        let date = new Date();
        firebase.firestore().collection("users").doc(email.toLowerCase()).set({
          firstName:firstName,
          lastName:lastName,
          email:email,
          notifications:[{
            date:date.getHours()+":"+date.getMinutes()+"  "+date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear(),
            title:"Clique para configurar a sua conta!",
            href:"/dashboard/perfil"
          }]
        }).then(()=>{
          callback({registered:true});
        }).catch((e)=>{
          console.log(error);
        });
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

