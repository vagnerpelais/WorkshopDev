//creating server with express
const express = require('express')
const nunjucks = require('nunjucks')
const server = express()


const ideas = [
    {
        img: 'https://image.flaticon.com/icons/svg/2729/2729007.svg',
        imgDesc: 'Imagem de Curso de Programação',
        title: 'Cursos de Programação',
        category: 'Estudo',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat aperiam voluptatum perspiciatis unde temporibus voluptatem sit repudiandae aliquam, et quod corrupti laborum dolore aspernatur pariatur necessitatibus libero quaerat aliquid reiciendis.',
        url: 'https://rocketseat.com.br'
    },
    {
        img: 'https://image.flaticon.com/icons/svg/2729/2729005.svg',
        imgDesc: 'Imagem de Saúde',
        title: 'Exercícios',
        category: 'Saúde',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat aperiam voluptatum perspiciatis unde temporibus voluptatem sit repudiandae aliquam, et quod corrupti laborum dolore aspernatur pariatur necessitatibus libero quaerat aliquid reiciendis.',
        url: 'https://rocketseat.com.br'
    },
    {
        img: 'https://image.flaticon.com/icons/svg/2729/2729027.svg',
        imgDesc: 'Imagem de Meditação',
        title: 'Meditação',
        category: 'Mentalidade',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat aperiam voluptatum perspiciatis unde temporibus voluptatem sit repudiandae aliquam, et quod corrupti laborum dolore aspernatur pariatur necessitatibus libero quaerat aliquid reiciendis.',
        url: 'https://rocketseat.com.br'
    },
    {
        img: 'https://image.flaticon.com/icons/svg/2729/2729032.svg',
        imgDesc: 'Imagem de Karaolê',
        title: 'Karaokê',
        category: 'Diversão em família',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat aperiam voluptatum perspiciatis unde temporibus voluptatem sit repudiandae aliquam, et quod corrupti laborum dolore aspernatur pariatur necessitatibus libero quaerat aliquid reiciendis.',
        url: 'https://rocketseat.com.br'
    },
]


//static files
server.use(express.static('public'))

//nunjucks configuration
nunjucks.configure('views', {
    express: server,
    noCache: true, 
})

//creating routes
server.get('/', function(req, res){
    const reversedIdeas = [...ideas].reverse()

    let lastIdeas = []

    for (let idea of reversedIdeas) {
        if (lastIdeas.length < 2) {
            lastIdeas.push(idea)
        }
    }


    return res.render('index.html', { ideas: lastIdeas })
})

server.get('/ideias', function(req, res){
    const reversedIdeas = [...ideas].reverse()
    
    
    return res.render('ideias.html', { ideas: reversedIdeas })
})





//setting the port 
server.listen(3333, () => console.log('Starting server...'))

