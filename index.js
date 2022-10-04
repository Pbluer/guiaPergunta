const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const conn = require('./database/database');
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta')

conn.authenticate()
    .then( res => {
        console.log(res,'Conexão efetuada com sucesso ao banco!');
    })
    .catch( err =>{
        console.log( err );
    });

app.set('view engine', 'ejs');
app.use( express.static( 'public' ) );

app.use( bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json() );

app.get('/', ( req,res ) => {
    Pergunta.findAll({raw: true, order:[ ['id','DESC'] ]}).then( perguntas => {
        res.render('index',{
            perguntas: perguntas
        })
    } )   
});

app.get('/perguntas', ( req,res ) => {
    res.render('perguntas')
});

app.post('/salvarperguntas', (req,res) => {
    let titulo = req.body.titulo
    let descricao = req.body.descricao

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then( () => {
        res.redirect('/')
    });

});

app.get('/pergunta/:id', (req, res) => {
    var id = req.params.id;

    Pergunta.findOne({
        where: { id: id }
    }).then( ( perguntas ) => {
        if( perguntas != undefined ){

            Resposta.findAll({ 
                where: {
                    perguntaId: perguntas.id
                },
                order: [ 
                    ['id', 'DESC']
                ]
            }).then( respostas => {

                res.render('pergunta', {
                    perguntas: perguntas,
                    respostas: respostas
                })

            } )
        }else{
            res.redirect('/')
        }
    });
    
})

app.post('/responder', (req,res) => {
    var codigo = req.body.codigo;
    var resposta = req.body.resposta;

    Resposta.create({
        corpo: resposta,
        perguntaId: codigo
    }).then( () => res.redirect('/pergunta/' + codigo ) )
});

app.listen( 3000, ()=> { console.log('Aplicação rodando com sucesso! <br>' )} )