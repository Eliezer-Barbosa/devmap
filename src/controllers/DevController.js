const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/ParseStringAsArray')

module.exports = {
    
    async index (request, response) {
        const devs = await Dev.find()
        return response.json(devs)
    },

    async store (request, response)  {
        // ES6 destructuring, getting user data from request body,
        // the input from the user
        const { github_username, techs, latitude, longitude } = request.body
        
        // get github_username for verification
        let dev = await Dev.findOne({ github_username });

        // if dev doensn't exist in the database, create a new dev
        if (!dev) {

            // response from github api
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            
            // if name is null, get value of login
            const { name = login, avatar_url, bio } = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs)
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
        }
        
        return response.json(dev)
    },

}