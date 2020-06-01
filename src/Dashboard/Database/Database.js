(function(){
    const get = ({firebase,table},callback) => {
        const docRef = firebase.firestore().collection('club').doc(table);
        docRef.get().then(res=>{
            callback({response:res.data()});
        })
    }

    const getClassificacao = ({firebase},callback) => {
        let collection = 'club';
        let doc = 'Classificacao';
        const docRef = firebase.firestore().collection(collection).doc(doc);
        docRef.get().then(res=>{
            callback({response:res.data()});
        })
    }

    const getJogadores = ({firebase},callback) => {
        let collection = 'club';
        let doc = 'Jogadores';
        const docRef = firebase.firestore().collection(collection).doc(doc);
        docRef.get().then(res=>{
            callback({response:res.data()});
        })
    }

    const getNoticias = ({firebase},callback) => {
        let collection = 'club';
        let doc = 'News';
        const docRef = firebase.firestore().collection(collection).doc(doc);
        docRef.get().then(res=>{
            callback({response:res.data()});
        })
    }

    const getComentarios = ({req,firebase},callback) => {
        let collection1 = 'club';
        let doc1 = 'News';
        let collection2 = 'Comentarios';
        let doc2 = req.body.name;
        const docRef = firebase.firestore().collection(collection1).doc(doc1).collection(collection2).doc(doc2);
        docRef.get().then(res=>{
            callback({response:res.data()});
        })
    }
    
    module.exports.get = get;
    module.exports.getClassificacao = getClassificacao;
    module.exports.getJogadores = getJogadores;
    module.exports.getNoticias = getNoticias;
    module.exports.getComentarios = getComentarios;
  }());
  
  