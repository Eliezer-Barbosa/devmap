const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/ParseStringAsArray')

module.exports = {
    async index (request, response) {
        
        const { latitude, longitude, techs } = request.query

        const techsArray = parseStringAsArray(techs)

        const devs = await Dev.find({
            // find technologies  
            techs: {
               $in: techsArray, 
            },
            // find devs in the perimeter of max 10 km
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000, // 10000 meters, 10 km
                },
            }

        })

        return response.json({ devs })
    }
}