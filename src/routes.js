const { Router } = require('express')
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router();

// getting all devs 
routes.get('/devs', DevController.index)

// creating a new dev
// resource: /devs
// async - await, because we are getting user data from github
routes.post('/devs', DevController.store)

// get devs search
routes.get('/search', SearchController.index)

module.exports = routes;