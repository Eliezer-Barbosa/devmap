const mongoose = require('mongoose')
const PointSchema = require('./utils/PointSchema')

const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    biografia: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,  
        index: '2dsphere'
    }
})

// Dev is the name that will be saved in the database.
// DevSchema is this schema
module.exports = mongoose.model('Dev', DevSchema)