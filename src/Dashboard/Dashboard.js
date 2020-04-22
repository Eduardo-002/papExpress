(function(){
  const start = (firebase,req,res,callback) => {
    firebase.auth().onAuthStateChanged((user)=>{
      if(!user)res.redirect('/login');
      else callback();
    })
  }

  module.exports.start = (firebase,req,res,callback) => start(firebase,req,res,callback);
}())