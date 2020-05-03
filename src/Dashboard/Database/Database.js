(function(){
    const get = ({firebase,table},callback) => {
        const docRef = firebase.firestore().collection('club').doc(table);
        docRef.get().then(res=>{
            callback({response:res.data()});
        })
    }
    
    module.exports.get = get;
  }());
  
  