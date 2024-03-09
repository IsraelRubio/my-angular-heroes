const jsonServer = require('json-server')
const middleware = jsonServer.defaults()
const server = jsonServer.create()
const router = jsonServer.router('db.json')

server.use(middleware)
server.use(jsonServer.bodyParser)
server.listen(3001, () => {
    console.log('JSON Server is running')
})

const heroesData = require('./data/heroes')

server.get('/heroes', (_req, res, _next) => {
    const name = _req.query.name;
    const id = _req.query.id;
    let filteredHeroes = heroesData.getHeroes.heroes;

    if (id) {
        filteredHeroes = filteredHeroes.filter(hero => hero.id === Number(id));
    }

    if (name) {
        filteredHeroes = filteredHeroes.filter(hero => hero.name.toLowerCase().includes(name.toLowerCase()));
    }

    setTimeout(() => {
        res.status(200).send(filteredHeroes);
    }, 2000);
})

server.get('/hero', (_req, res, _next) => {
    setTimeout(() => {
        res.status(200).send(heroesData.getHero.hero)
    }, 2000);
})

server.post('/hero', (_req, res, _next) => {
    setTimeout(() => {
        res.status(200).send(heroesData.postHero.hero)
    }, 2000);
})

server.put('/hero', (_req, res, _next) => {
    setTimeout(() => {
        res.status(200).send(heroesData.putHero.hero)
    }, 2000);
})