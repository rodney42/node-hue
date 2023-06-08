/**
 * Hue API wrapper
 */
const http = require('./lib/http.js');
const huePushClient = require('hue-push-client');

// Definition of the resources available by the hue v2 clip api
const resources = [
    { path: "light", create:true, delete:false, update:true },
    { path: "scene", create:true, delete:true, update:true },
    { path: "room", create:true, delete:true, update:true },
    { path: "zone", create:true, delete:true, update:true },
    { path: "bridge_home", create:false, delete:false, update:false },
    { path: "grouped_light", create:false, delete:false, update:true },
    { path: "device", create:false, delete:true, update:true },
    { path: "bridge", create:false, delete:true, update:true },
    { path: "device_power", create:false, delete:false, update:true },
    { path: "zigbee_connectivitiy", create:false, delete:false, update:true },
    { path: "zgp_connectivity", create:false, delete:false, update:true },
    { path: "zigbee_device_discovery", create:false, delete:false, update:true },
    { path: "motion", create:false, delete:false, update:true },
    { path: "temperature", create:false, delete:false, update:true },
    { path: "light_level", create:false, delete:false, update:true },
    { path: "button", create:false, delete:false, update:true },
    { path: "relative_rotary", create:false, delete:false, update:true },
    { path: "behavior_script", create:false, delete:false, update:false },
    { path: "behavior_instance", create:true, delete:true, update:true },
    { path: "geofence_client", create:true, delete:true, update:true },
    { path: "geolocation", create:false, delete:false, update:true },
    { path: "entertainment_configuration", create:true, delete:true, update:true },
    { path: "entertainment", create:false, delete:false, update:true },
    { path: "homekit", create:false, delete:false, update:true },
    { path: "matter", create:false, delete:false, update:true },
    { path: "matter_fabric", create:false, delete:true, update:false },
    { path: "smart_scene", create:false, delete:true, update:false },
];

/**
 * Builds a method name based on a resource path.
 * @param {*} resource 
 * @returns The method name (without get)
 */
const buildMethodName= (resource)=>{
    var result='';
    var nextUpperCase = true;
    for( p=0; p<resource.length; p++) {
        if( resource.charAt(p)=='_' ) {
            nextUpperCase = true;
        } else {
            result += (nextUpperCase ? resource.charAt(p).toUpperCase() : resource.charAt(p));
            nextUpperCase = false;
        }
    }
    return result;
}

/**
 * Connects to a hue bridge.
 * 
 * @param opt 
 * 
 * @returns The hue api object.
 */
module.exports.connect = (opt) => {
    const context = {
        key : (opt?opt.key:null) || process.env.HUE_KEY,
        host : (opt?opt.host:null) || process.env.HUE_HOST || 'hue',
        eventListener : (opt?opt.eventListener:null)
    };
    const log = (opt.log ? opt.log : require('./lib/log.js') );

    if( !context.key ) {
        throw new Error("The required hue API key is not provided. You may use the environemnt variable HUE_KEY to set one.")
    }
    log.info("Connecting to hue host "+context.host+".");
    const httpConnection = http.use({
        key : context.key,
        prefix : 'https://'+context.host+'/clip/v2'
    });

    let eventClient=null;
    // May add push client
    if( context.eventListener ) {
        log.info("Creating push client.");
        eventClient = new huePushClient({
            ip: context.host, 
            user: context.key
        });
        eventClient.addEventListener('open', () => { log.info('Push connection opened'); });
        eventClient.addEventListener('close', () => { log.info('Push connection closed.'); });
        eventClient.addEventListener('error', (e) => { log.error('Push connection error: ' + e.message); });
        eventClient.addEventListener('message', function (message) {
            if (!message.data) {
                return;
            }
            try {
                let event = JSON.parse(message.data)[0];
                event.getData = () =>{
                    return event.data[0];
                }
                event.getTime = () =>{
                    return Date.parse(event.creationtime);
                }
                log.trace('Hue push notification : '+JSON.stringify(event,1,1));
                opt.eventListener( event );
            } catch (e) {
                log.error('could not parse push data '+e);
                return;
            }
        });
    }

    let hue = {
        log : log
    };

    // Creating resource acccess methods
    resources.forEach( resource => {
        var methodName = buildMethodName(resource.path);
        hue['get'+methodName+'s'] = async() => { return await httpConnection.get('/resource/'+resource.path); }
        hue['get'+methodName] = async(id) => { return await httpConnection.get('/resource/'+resource.path+'/'+id); }
        if( resource.create ) {
            hue['create'+methodName] = async(data) => { return await httpConnection.post('/resource/'+resource.path, data); }
        }
        if( resource.update ) {
            hue['set'+methodName] = async(id,data) => { return await httpConnection.put('/resource/'+resource.path+'/'+id, data); }
        }
        if( resource.delete ) {
            hue['delete'+methodName] = async(id) => { return await httpConnection.delete('/resource/'+resource.path+'/'+id); }
        }
        log.trace("Created methods for resource access "+methodName);
    });
    hue.getResources = async () => { return await httpConnection.get('/resource'); }

    /**
     * Closes the hue connection. Only really needed, if a push client is used.
     */
    hue.close = () => {
        log.info("Closing hue connection.");
        if( eventClient ) {
            eventClient.close();
        }
    }

    /**
     * Self documentation creation.
     * 
     * @returns The API documentation as markdown.
     */
    hue.getDocumentation = () => {
        var markdown='';
        var hueApiLink = 'https://developers.meethue.com/develop/hue-api-v2/api-reference/';
        markdown += '| Method | Description | HTTP method | Hue api link |\n';
        markdown += '| ------ | ----------- | ----------- | ------------ |\n';
        resources.forEach( resource => {
            var methodName = buildMethodName(resource.path);
            markdown += '| get'+methodName+'s() | Get all '+resource.path+ '(s). | GET | [API Link]('+hueApiLink+"#resource_"+resource.path+"_get)|\n";
            markdown += '| get'+methodName+'(id) | Get single '+resource.path+ '. | GET | [API Link]('+hueApiLink+"#resource_"+resource.path+"__id__get)|\n";
            if( resource.create ) {
                markdown += '| create'+methodName+'(data) | Create '+resource.path+ '. | POST | [API Link]('+hueApiLink+"#resource_"+resource.path+"_post)|\n";
            }
            if( resource.update ) {
                markdown += '| set'+methodName+'(id,data) | Update '+resource.path+ '. | PUT| [API Link]('+hueApiLink+"#resource_"+resource.path+"__id__put)|\n";
                
            }
            if( resource.delete ) {
                markdown += '| delete'+methodName+'(id) | Delete '+resource.path+ '. | DELETE | [API Link]('+hueApiLink+"#resource_"+resource.path+"__id__delete)|\n";
            }
        });
        markdown += '| getResources() | Get all resources.| GET | [API Link]('+hueApiLink+"#resource_get)|\n";
        markdown += '| close() | Closes the hue connection. Removes a eventually registered event listener.|||\n'
        markdown += '| getDocumentation() | Returns this API documentation as markdown.|||\n'
        markdown += '--------------------------------\n'
        return markdown;
    }
    return hue;
}

