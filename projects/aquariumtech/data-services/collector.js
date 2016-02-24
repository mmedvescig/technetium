/*
This app get the data from a mqtt server and save it to a mysql db
*/

var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://test.mosquitto.org');

mqttTopic = 'technetium/test/aquariumtech';

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'technetium',
  password : '8wGWL2XDUG5T8Y23',
  database : 'technetium'
});
connection.connect();

client.on('connect', function () {
  console.log("connected to MQTT");
  client.subscribe(mqttTopic);
});

client.on('message', function (topic, message) {
  // message is Buffer

  messageJSON = JSON.parse(message);

  zigbeeId = messageJSON.device.zigbeeId;
  timeStamp = messageJSON.device.timeStamp;
  mysqlTimeStamp = new Date(Date.parse(timeStamp)).toISOString().slice(0, 19).replace('T', ' ');
  temperature = messageJSON.device.measures.temperature;

  query = "INSERT INTO `aquariumtech`(`timeStamp`, `zigbeeId`, `deviceType`, `temperature`) VALUES ('" + mysqlTimeStamp + "', '"+zigbeeId+"', '101', '"+ temperature +"')";
  console.log(query);


  connection.query(query, function(err, rows, fields) {
    if (!err)
      console.log('The solution is: ', rows);
    else
      console.log('Error while performing Query.');
      console.log(err);
  });

    //connection.end();

  //client.end();

});
