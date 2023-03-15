/**
 * Example for device handling.
 * 
 * Lists all devices names, product name and provided services.
 */
const hueApi = require('../index.js'); // Change to require('node-hue') if running outside the examples folder

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
    const hue = hueApi.connect();
    
    // Get all devices
    const devices = await hue.getDevices();
    // console.log(JSON.stringify(devices,1,1)); Uncomment to see the complete return
    devices.forEach(d => {
        let services = [];
        d.services.forEach(s=>{ services.push(s.rtype); });
        console.log(
            //fix(d.id,25)+  Uncomment to see the device id 
            fix(d.metadata.name,25)+
            fix(d.product_data.product_name,28)+
            fix(""+services,70)
        );
    });
}
run();