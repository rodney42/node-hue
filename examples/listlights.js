/**
 * Example for light handling.
 * 
 * Lists all light IDs and names.
 */
const hueApi = require('../index.js'); // Change to require('node-hue') if running outside the examples folder

run = async () => {
    const hue = hueApi.connect();
    
    // Get all lights
    let lights = await hue.getLights();
    lights.forEach(light => {
        console.log(light.id+"\t"+light.metadata.name);
    });
}
run();