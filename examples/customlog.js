/**
 * Example for custom logging.
 * 
 * A redirection to another logging library (e.g. winston) is possible with it. 
 * For this example the console log is just appended with a date and the level is ignored.
 */
const hueApi = require('../index.js'); // Change to require('node-hue') if running outside the examples folder

run = async () => {
    const hue = hueApi.connect({
        // Implement custom logging
        log: {
            trace : (msg) =>    { console.log('trace\t'+new Date().toLocaleString()+'\t'+msg); },
            debug : (msg) =>    { console.log('debug\t'+new Date().toLocaleString()+'\t'+msg); },
            info  : (msg) =>    { console.log('info\t'+new Date().toLocaleString()+'\t'+msg); },
            warn  : (msg) =>    { console.log('warn\t'+new Date().toLocaleString()+'\t'+msg); },
            error : (msg) =>    { console.log('error\t'+new Date().toLocaleString()+'\t'+msg); }
        }
    });
    // Get all lights
    let lights = await hue.getLights();
    lights.forEach(light => {
        hue.log.info(light.id+"\t"+light.metadata.name);
    });
}
run();