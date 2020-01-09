const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const sequelize = require('./db/db')
const Pergunta = require('./db/pergunta')

//Database

sequelize.authenticate().then(()=>{
    console.log("Tudo ok")
}).catch((erro)=>{
    console.log("Deu pal" + erro)
})

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// Estou dizendo para o Express usar o EJS como View engine
app.set('view engine','ejs');
app.use(express.static('public'))

app.get("/",(req, res) => {
    Pergunta.findAll({raw: true, order:[
        ['id', 'DESC'] //ASC Crescente 
    ]}).then((perguntas)=>{
        res.render('index',{
            perguntas: perguntas
        })
    })
    

});

app.get('/perguntar', (req,res)=>{
    res.render('perguntar')
})

app.post('/salvarpergunta', (req,res)=>{
    const titulo = req.body.titulo
    const descricao = req.body.descricao

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
       res.redirect("/")
    }) 

})

app.get('/perguntar/:id', (req,res)=>{
    const id = req.params.id
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){ // Pergunta achada
           res.render('pergunta', {
            pergunta: pergunta
           })
          
        }else{ // pergunta não achada
           res.redirect('/')
        }
    })
})


const PORT = 8000

app.listen(PORT,()=>{console.log("App rodando!")});











