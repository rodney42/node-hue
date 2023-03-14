/**
 * Example for getting push notifications.
 * List all events emitted by the hue bridge for one minute and closes.
 */
const hueApi = require('../index.js'); // Change to require('huenode') if running outside the examples folder

// Helper function
const fix = (val, expected, fillup=' ') => {
    let ret = val;
    if( ret.length>expected ) {
        ret = val.substring(0, expected-3 )+'...';
    } else {
        while (ret.length<expected) ret += fillup;
    }
    return ret;
} 

run = async () => {
    // The event listener implementaion
    const listener = (event) => {
        console.log(
            fix(event.getData().type,15)+
            fix(event.getData().id,40)+
            fix(event.getData().id_v1,15)+
            fix(JSON.stringify(event.getData()), 150)
        );
        //Uncomment to see the complete event json
        //console.log(JSON.stringify(event,1,1));
    }
    // Connect with providing the listener
    const hue=hueApi.connect( {
        eventListener : listener   // The eventlistener is given as option
    });
    // Close after one minute
    setTimeout( ()=> {
        console.log("Closing");
        hue.close();
    }, 60000);
}
run();