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

    module.exports.removeNotification = ({req,firebase},callback) => {
        let collection = 'users';
        firebase.auth().onAuthStateChanged((user)=>{
            let doc = user.email;
            const docRef = firebase.firestore().collection(collection).doc(doc);
            docRef.get().then(res=>{
                let notifications = res.data().notifications;
                notifications.splice(-req.body.i,1);
                firebase.firestore().collection(collection).doc(doc).update({
                    notifications:notifications
                }).then(()=>callback({done:true}));
            })
        })
    }

    module.exports.setUserData = ({firebase,req},callback)=>{
        let collection = 'users';
        let doc = req.body.email.toLowerCase();
        firebase.firestore().collection(collection).doc(doc).update({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            pais:req.body.pais,
            distrito:req.body.distrito,
            concelho:req.body.concelho,
            idade:req.body.age,
        })
    }

    module.exports.getProximo = ({firebase},callback) => {
        let collection = 'Jogos';
        let doc = 'Proximo';
        const docRef = firebase.firestore().collection(collection).doc(doc);
        docRef.get().then(res=>{
            callback({response:res.data()});
        })
    }

    module.exports.getProximos = ({firebase},callback) => {
        let collection = 'Jogos';
        let doc = 'Proximos';
        const docRef = firebase.firestore().collection(collection).doc(doc);
        docRef.get().then(res=>{
            callback({response:res.data()});
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
        let collection1 = 'club';
        let doc1 = 'News';
        let collection2 = 'Noticias';
        const docRef = firebase.firestore().collection(collection1).doc(doc1).collection(collection2);
        docRef.get().then(querySnapshot=>{
            let r = querySnapshot.docs.map((doc)=>{
                return {id:doc.id,...doc.data()}
            })
            console.log(r);
            callback({response:r});
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
  
  