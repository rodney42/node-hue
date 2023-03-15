/**
 * Example for producing the documentation.
 * 
 * Just creates the markdown API documentation and quits.
 */
const hueApi = require('../index.js'); // Change to require('node-hue') if running outside the examples folder

const hue = hueApi.connect();
console.log(hue.getDocumentation());