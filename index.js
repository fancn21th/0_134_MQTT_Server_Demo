var http = require("http"),
  httpServ = http.createServer(),
  mosca = require("mosca"),
  mqttServ = new mosca.Server({});

mqttServ.attachHttpServer(httpServ);

// fired when a client connects
mqttServ.on("clientConnected", function(client) {
  console.log("Client Connected:", client.id);
});

// fired when a message is published from client
mqttServ.on("published", function(packet, client) {
  console.log("Published", packet);
});

// fired when a client disconnects
mqttServ.on("clientDisconnected", function(client) {
  console.log("Client Disconnected:", client.id);
});

httpServ.listen(3000);
