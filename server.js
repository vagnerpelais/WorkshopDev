//creating server with express
const express = require('express')
const nunjucks = require('nunjucks')
const server = express()

const db = require('./db')


//static files
server.use(express.static('public'))

//habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))

//nunjucks configuration
nunjucks.configure('views', {
    express: server,
    noCache: true, 
})

//creating routes
server.get('/', function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send('Erro no banco de dados')
        }

        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []

        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }


        return res.render('index.html', { ideas: lastIdeas })
    })

    
})

server.get('/ideias', function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send('Erro no banco de dados')
        }

        const reversedIdeas = [...rows].reverse()
    
        return res.render('ideias.html', { ideas: reversedIdeas })
    })


})

server.post('/', function(req, res) {

    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
`

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return res.send('Erro no banco de dados')
        }

        return res.redirect('/ideias')
    })

    
})





//setting the port 
server.listen(3333, () => console.log('Starting server...'))

