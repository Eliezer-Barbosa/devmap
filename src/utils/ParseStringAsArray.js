module.exports = function parseStringAsArray(arrayAsString) {
    // split the string of techs by comma, then, for each tech, remove
    // spaces before and after using trim
    return arrayAsString.split(',').map(tech => tech.trim())
}