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
        firebase.firestore().collection('club').doc('Jogos').collection('proximo').doc('jogo')
            .get().then(res=>{
                callback({response:res.data()});
            })
    }

    module.exports.getProximos = ({firebase},callback) => {
        firebase.firestore().collection('club').doc('Jogos').collection('proximos')
            .get().then(snapshot=>{
            let data = [];
            snapshot.forEach(doc => {
                data.push(doc.data());
            });
            callback({response:data});
            }).catch(err => {
                console.log('Error getting documents', err);
            });
    }

    module.exports.getApostasResultados = ({firebase,req},callback) => {
        firebase.auth().onAuthStateChanged(user=>{
            let response = [];
            firebase.firestore().collection('users').doc(user.email).collection('Apostas').where("id","in",req.body.ids)
            .get().then((snapshot)=>{
                snapshot.forEach(snap=>{
                    response.push(snap.data())
                })
                callback({response});
            }).catch(e=>{
                console.log(e);
                response.push(e);
            })
        })
    }

    module.exports.fazerAposta = ({firebase,req},callback) => {
        let jogoDoc = 'jogo'+req.body.id;
        firebase.firestore().collection('club').doc('Jogos').collection('proximos').doc(jogoDoc)
        .get().then((res)=>{
            let jogo = res.data();
            if(jogo.data.ApostaLimite<Date.now()){callback({response:{done:false,error:'Já passou da hora!'}});}
            firebase.auth().onAuthStateChanged((user)=>{
                firebase.firestore().collection('users').doc(user.email).collection('Apostas').doc(jogoDoc).set(
                    {
                        jogo:jogo,
                        date:Date.now(),
                        id:req.body.id,
                        int:req.body.int,
                        fin:req.body.fin
                    },{merge:true}
                ).then(()=>{
                    firebase.firestore().collection('users').doc(user.email).collection('ApostasQueue').doc(jogoDoc).set(
                        {
                            date:Date.now(),
                            id:req.body.id,
                            int:req.body.int,
                            fin:req.body.fin
                        },{merge:true}
                    ).then(()=>{
                        callback({response:{done:true}});
                    }).catch(e=>{
                        console.log(e);
                    })
                }).catch(e=>{
                    console.log(e);
                })
            })
        }).catch((e)=>{
            console.log(e);
            callback({response:{done:false,error:e}});
        })
        /*let collection = [];
        let doc = [];
        firebase.auth().onAuthStateChanged((user)=>{
            collection[0] = 'users';
            doc[0] = user.email;
            collection[1] = 'Apostas';
            doc[1] = 'jogo'+req.body.id;
            console.log(collection,doc);
            const docRef = firebase.firestore().collection(collection[0]).doc(doc[0]).collection(collection[1]).doc(doc[1]);
            docRef.get().then(res=>{
                //firebase.firestore
                console.log(res.data());
                callback({response:{done:true}});
            })
        })*/
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
  
  