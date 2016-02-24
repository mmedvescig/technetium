var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://test.mosquitto.org');
var CronJob = require('cron').CronJob;

mqttTopic = 'technetium/test/aquariumtech';

new CronJob('00 * * * * *', function() {

  low = 20;
  high = 28;
  temperature = parseFloat((Math.random() * (high - low) + low).toFixed(1));

  //Creamos el objeto JSON
  var aquariumtechJSON =
  { "device" :
     {
       "zigbeeId" : 'fakedevice123',
       "measuresType" : "101.Aquarium",
       "timeStamp" : new Date(),
       "measures" :
       {
         "temperature" : temperature
       }
     }
   };

   console.log(JSON.stringify(aquariumtechJSON));
   //Enviamos el frame JSON al Broker MQTT
   client.publish(mqttTopic, JSON.stringify(aquariumtechJSON));

}, null, true);
