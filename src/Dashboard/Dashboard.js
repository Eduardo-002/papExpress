(function(){
  const start = (firebase,req,res,callback) => {
    firebase.auth().onAuthStateChanged((user)=>{
      if(!user&&false)res.redirect('/login?error=semLogin');
      else callback({firebase,req,res});
    })
  }

  const databaseData = async (firebase,req,res) => {
    //console.log(firebase);
    await firebase.firestore().collection('Equipas').doc('Alvarenga').get().then((doc)=>{
      console.log(doc.data);
      res.send(doc.data);
    })
  }

  module.exports.start = (firebase,req,res,callback) => start(firebase,req,res,callback);
  module.exports.databaseData = (firebase,req,res) => databaseData(firebase,req,res);
}())