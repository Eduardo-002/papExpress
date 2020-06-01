(function(){
    module.exports.get = ({firebase,table},callback) => {
        const docRef = firebase.firestore().collection('club').doc(table);
        docRef.get().then(res=>{
            callback({response:res.data()});
        })
    }

    module.exports.getUserData = ({firebase},callback)=>{
        let collection = 'users';
        let doc;
        firebase.auth().onAuthStateChanged((user)=>{
            doc = user.email;
            const docRef = firebase.firestore().collection(collection).doc(doc);
            docRef.get().then(res=>{
                callback({response:res.data()});
            })
        })

    }

    module.exports.getClassificacao = ({firebase},callback) => {
        let collection = 'club';
        let doc = 'Classificacao';
        const docRef = firebase.firestore().collection(collection).doc(doc);
        docRef.get().then(res=>{
            callback({response:res.data()});
        })
    }

    module.exports.getJogadores = ({firebase},callback) => {
        let collection = 'club';
        let doc = 'Jogadores';
        const docRef = firebase.firestore().collection(collection).doc(doc);
        docRef.get().then(res=>{
            callback({response:res.data()});
        })
    }

    module.exports.getNoticias = ({firebase},callback) => {
        let collection = 'club';
        let doc = 'News';
        const docRef = firebase.firestore().collection(collection).doc(doc);
        docRef.get().then(res=>{
            callback({response:res.data()});
        })
    }

    module.exports.getComentarios = ({req,firebase},callback) => {
        let collection1 = 'club';
        let doc1 = 'News';
        let collection2 = 'Comentarios';
        console.log(req.body.name);
        let doc2 = req.body.name;
        const docRef = firebase.firestore().collection(collection1).doc(doc1).collection(collection2).doc(doc2);
        docRef.get().then(res=>{
            console.log(res.data());
            console.log(2);
            callback({response:res.data()});
        })
        console.log(1);
    }
}());
  
  