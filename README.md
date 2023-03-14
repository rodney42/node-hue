# Huenode

A minimalist approch to wrap the hue clip v2 api using javascript. There are no model objects and helper methods. The result of the calls are provided as they are returned by the hue bridge. The API methods return promises and can be used together with `await`.

## Getting started

A hue user key is needed to access the bridge. This key can be obtained by following the advice here : (https://developers.meethue.com/develop/get-started-2/).
Automatic discovery using mDNS is not supported. You need to know your hue bridge IP or have a valid host dns entry.

### Example: List all lights 

This example lists all lights with their ID and ui name.

    const hueApi = require('huenode');
    run = async () => {
        const hue = hueApi.connect();
        let lights = await hue.getLights();
        lights.forEach(light => {
            console.log(light.id+"\t"+light.metadata.name);
        });
    }
    run();

Executing this example may produce a result like this one:

    227cf111-a326-4d27-8d9f-c3e2e464b1a9    Kitchen lamp
    c81f9556-b504-417d-8aee-2275b71a761d    Bedroom lamp
    17c0bd7e-d7c3-43d6-9c85-a440ffa50930    Garden lamp

## Using events

The library [hue-push-client](https://www.npmjs.com/package/hue-push-client?activeTab=readme) is used to retrieve the hue bridge notifications (server side events). 

### Example: React on events

This example lists endlessly for events emitted by the hue bridge.

    const hueApi = require('huenode');
    run = async () => {
        const listener = (event) => {
            console.log(JSON.stringify(event,1,1));
        }
        const hue=hueApi.connect( {
            eventListener : listener   // The eventlistener is given as option
        });
    }
    run();

More examples can be found in the examples folder.

## API connect options

On the `connect` methods, these options are possible.

| Property      | Description |
| ------------- | ----------- |
| host          | Hostname or address of you hue bridge. Can also be set by the enviroment variable `HUE_HOST` and defaults to `hue` |
| key           | API access key. Can also be set by the enviroment variable `HUE_KEY`. |
| eventListener | The event listener callback.|


## Environemnt variables

| Environment variable | Description | Default |
| -------------------- | ----------- | ------- |
| HUE_HOST             | Hostname or address of you hue bridge. | hue |
| HUE_KEY              | API access key | |
| LOG_LEVEL            | Log level : TRACE,DEBUG,INFO,WARN,ERROR | INFO|

## API reference

This API reference is generated from the list of supported resources provided by the hue api. It should cover all methods that are provided by the clip V2 api. If you want to access the hue api description, you need a developer login at the meethue side.

| Method | Description | HTTP method | Hue api link |
| ------ | ----------- | ----------- | ------------ |
| getLights() | Get all light(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_light_get)|
| getLight(id) | Get single light. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_light__id__get)|
| createLight(data) | Create light. | POST | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_light_post)|
| setLight(id,data) | Update light. | PUT| [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_light__id__put)|
| getScenes() | Get all scene(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_scene_get)|
| getScene(id) | Get single scene. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_scene__id__get)|
| createScene(data) | Create scene. | POST | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_scene_post)|
| setScene(id,data) | Update scene. | PUT| [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_scene__id__put)|
| deleteScene(id) | Delete scene. | DELETE | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_scene__id__delete)|
| getRooms() | Get all room(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_room_get)|
| getRoom(id) | Get single room. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_room__id__get)|
| createRoom(data) | Create room. | POST | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_room_post)|
| setRoom(id,data) | Update room. | PUT| [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_room__id__put)|
| deleteRoom(id) | Delete room. | DELETE | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_room__id__delete)|
| getZones() | Get all zone(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_zone_get)|
| getZone(id) | Get single zone. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_zone__id__get)|
| createZone(data) | Create zone. | POST | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_zone_post)|
| setZone(id,data) | Update zone. | PUT| [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_zone__id__put)|
| deleteZone(id) | Delete zone. | DELETE | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_zone__id__delete)|
| getBridgeHomes() | Get all bridge_home(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_bridge_home_get)|
| getBridgeHome(id) | Get single bridge_home. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_bridge_home__id__get)|
| getGroupedLights() | Get all grouped_light(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_grouped_light_get)|
| getGroupedLight(id) | Get single grouped_light. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_grouped_light__id__get)|
| setGroupedLight(id,data) | Update grouped_light. | PUT| [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_grouped_light__id__put)|
| getDevices() | Get all device(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_device_get)|
| getDevice(id) | Get single device. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_device__id__get)|
| setDevice(id,data) | Update device. | PUT| [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_device__id__put)|
| deleteDevice(id) | Delete device. | DELETE | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_device__id__delete)|
| getBridges() | Get all bridge(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_bridge_get)|
| getBridge(id) | Get single bridge. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_bridge__id__get)|
| setBridge(id,data) | Update bridge. | PUT| [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_bridge__id__put)|
| deleteBridge(id) | Delete bridge. | DELETE | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_bridge__id__delete)|
| getDevicePowers() | Get all device_power(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_device_power_get)|
| getDevicePower(id) | Get single device_power. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_device_power__id__get)|
| setDevicePower(id,data) | Update device_power. | PUT| [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_device_power__id__put)|
| getZigbeeConnectivitiys() | Get all zigbee_connectivitiy(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_zigbee_connectivitiy_get)|
| getZigbeeConnectivitiy(id) | Get single zigbee_connectivitiy. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_zigbee_connectivitiy__id__get)|
| setZigbeeConnectivitiy(id,data) | Update zigbee_connectivitiy. | PUT| [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_zigbee_connectivitiy__id__put)|
| getZgpConnectivitys() | Get all zgp_connectivity(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_zgp_connectivity_get)|
| getZgpConnectivity(id) | Get single zgp_connectivity. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_zgp_connectivity__id__get)|
| setZgpConnectivity(id,data) | Update zgp_connectivity. | PUT| [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_zgp_connectivity__id__put)|
| getZigbeeDeviceDiscoverys() | Get all zigbee_device_discovery(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_zigbee_device_discovery_get)|
| getZigbeeDeviceDiscovery(id) | Get single zigbee_device_discovery. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_zigbee_device_discovery__id__get)|
| setZigbeeDeviceDiscovery(id,data) | Update zigbee_device_discovery. | PUT| [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_zigbee_device_discovery__id__put)|
| getMotions() | Get all motion(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_motion_get)|
| getMotion(id) | Get single motion. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_motion__id__get)|
| setMotion(id,data) | Update motion. | PUT| [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_motion__id__put)|
| getTemperatures() | Get all temperature(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_temperature_get)|
| getTemperature(id) | Get single temperature. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_temperature__id__get)|
| setTemperature(id,data) | Update temperature. | PUT| [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_temperature__id__put)|
| getLightLevels() | Get all light_level(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_light_level_get)|
| getLightLevel(id) | Get single light_level. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_light_level__id__get)|
| setLightLevel(id,data) | Update light_level. | PUT| [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_light_level__id__put)|
| getButtons() | Get all button(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_button_get)|
| getButton(id) | Get single button. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_button__id__get)|
| setButton(id,data) | Update button. | PUT| [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_button__id__put)|
| getRelativeRotarys() | Get all relative_rotary(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_relative_rotary_get)|
| getRelativeRotary(id) | Get single relative_rotary. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_relative_rotary__id__get)|
| setRelativeRotary(id,data) | Update relative_rotary. | PUT| [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_relative_rotary__id__put)|
| getBehaviorScripts() | Get all behavior_script(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_behavior_script_get)|
| getBehaviorScript(id) | Get single behavior_script. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_behavior_script__id__get)|
| getBehaviorInstances() | Get all behavior_instance(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_behavior_instance_get)|
| getBehaviorInstance(id) | Get single behavior_instance. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_behavior_instance__id__get)|
| createBehaviorInstance(data) | Create behavior_instance. | POST | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_behavior_instance_post)|
| setBehaviorInstance(id,data) | Update behavior_instance. | PUT| [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_behavior_instance__id__put)|
| deleteBehaviorInstance(id) | Delete behavior_instance. | DELETE | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_behavior_instance__id__delete)|
| getGeofenceClients() | Get all geofence_client(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_geofence_client_get)|
| getGeofenceClient(id) | Get single geofence_client. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_geofence_client__id__get)|
| createGeofenceClient(data) | Create geofence_client. | POST | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_geofence_client_post)|
| setGeofenceClient(id,data) | Update geofence_client. | PUT| [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_geofence_client__id__put)|
| deleteGeofenceClient(id) | Delete geofence_client. | DELETE | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_geofence_client__id__delete)|
| getGeolocations() | Get all geolocation(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_geolocation_get)|
| getGeolocation(id) | Get single geolocation. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_geolocation__id__get)|
| setGeolocation(id,data) | Update geolocation. | PUT| [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_geolocation__id__put)|
| getEntertainmentConfigurations() | Get all entertainment_configuration(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_entertainment_configuration_get)|
| getEntertainmentConfiguration(id) | Get single entertainment_configuration. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_entertainment_configuration__id__get)|
| createEntertainmentConfiguration(data) | Create entertainment_configuration. | POST | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_entertainment_configuration_post)|
| setEntertainmentConfiguration(id,data) | Update entertainment_configuration. | PUT| [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_entertainment_configuration__id__put)|
| deleteEntertainmentConfiguration(id) | Delete entertainment_configuration. | DELETE | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_entertainment_configuration__id__delete)|
| getEntertainments() | Get all entertainment(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_entertainment_get)|
| getEntertainment(id) | Get single entertainment. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_entertainment__id__get)|
| setEntertainment(id,data) | Update entertainment. | PUT| [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_entertainment__id__put)|
| getHomekits() | Get all homekit(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_homekit_get)|
| getHomekit(id) | Get single homekit. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_homekit__id__get)|
| setHomekit(id,data) | Update homekit. | PUT| [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_homekit__id__put)|
| getMatters() | Get all matter(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_matter_get)|
| getMatter(id) | Get single matter. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_matter__id__get)|
| setMatter(id,data) | Update matter. | PUT| [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_matter__id__put)|
| getMatterFabrics() | Get all matter_fabric(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_matter_fabric_get)|
| getMatterFabric(id) | Get single matter_fabric. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_matter_fabric__id__get)|
| deleteMatterFabric(id) | Delete matter_fabric. | DELETE | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_matter_fabric__id__delete)|
| getSmartScenes() | Get all smart_scene(s). | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_smart_scene_get)|
| getSmartScene(id) | Get single smart_scene. | GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_smart_scene__id__get)|
| deleteSmartScene(id) | Delete smart_scene. | DELETE | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_smart_scene__id__delete)|
| getResources() | Get all resources.| GET | [API Link](https://developers.meethue.com/develop/hue-api-v2/api-reference/#resource_get)|
| close() | Closes the hue connection. Removes a eventually registered event listener.|||
| getDocumentation() | Returns this API documentation as markdown.|||
--------------------------------
