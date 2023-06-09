/**
 * Example for light handling.
 * 
 * Expectes a light name and toggles the light on or off. If the light is not found by name, the available lights are displayed.
 */
const hueApi = require('../index.js'); // Change to require('node-hue') if running outside the examples folder

run = async () => {
    if( process.argv.length<=2 ) {
        console.info("Expecting a light name as program argument");
        process.exit(2);
    }
    let lightname = process.argv[2];

    const hue = hueApi.connect();
    
    // Get all lights
    let lights = await hue.getLights();
    let found=false;
    let names=[];
    //Uncomment to see all lights
    //console.log(JSON.stringify(lights,1,1));
    for(l=0; l<lights.length; l++ ) {
        let light = lights[l];
        names.push(light.metadata.name);
        if( lightname == light.metadata.name ) {
            found = true;
            try {
                let ok = await hue.setLight(light.id, {
                    on: {
                        on : !light.on.on
                    }
                });
                console.log("Light with name "+lightname+" toggled to state "+(!light.on.on?'on':'off'));
            } catch (e) {
                console.log("Err "+e);
            }
            
        }
    };
    
    if( !found ) {
        console.log("Light with name "+lightname+" not found. Available lights: "+JSON.stringify(names));
    }
}
run();