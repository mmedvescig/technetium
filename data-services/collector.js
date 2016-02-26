/*
This app get the data from a mqtt server and save it to a mysql db
*/

var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://test.mosquitto.org');

mqttTopic = 'technetium/testing';

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

  //Tomamos los datos basicos del mensaje
  zigbeeId = messageJSON.device.zigbeeId;
  timeStamp = messageJSON.device.timeStamp;
  mysqlTimeStamp = new Date(Date.parse(timeStamp)).toISOString().slice(0, 19).replace('T', ' ');
  measuresType = messageJSON.device.measuresType;

  //Vemos de que tipo de mensaje es para procesarlo
  switch (measuresType) {
    case 100: //Es del tipo parking
      temperature = messageJSON.device.measures.temperature;
      x = messageJSON.device.measures.magnetic.x;
      y = messageJSON.device.measures.magnetic.y;
      z = messageJSON.device.measures.magnetic.z;
      query = "INSERT INTO `parkingtech`(`timeStamp`, `zigbeeId`, `deviceType`, `temperature`, `x`, `y`, `z`) VALUES ('" + mysqlTimeStamp + "', '"+zigbeeId+"', '" + measuresType + "', '"+ temperature +"', '"+ x +"', '"+ y +"', '"+ z +"')";
      console.log(query);
    break;
    case 101: //Es del tipo aquarium
      temperature = messageJSON.device.measures.temperature;
      query = "INSERT INTO `aquariumtech`(`timeStamp`, `zigbeeId`, `deviceType`, `temperature`) VALUES ('" + mysqlTimeStamp + "', '"+zigbeeId+"', '" + measuresType + "', '"+ temperature +"')";
      console.log(query);
    break;
  }

  connection.query(query, function(err, rows, fields) {
    if (!err)
      console.log('The solution is: ', rows);
    else
      console.log('Error while performing Query.');
      console.log(err);
  });

});
