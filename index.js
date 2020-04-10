var http = require("http"),
  httpServ = http.createServer(),
  mosca = require("mosca"),
  mqttServ = new mosca.Server({});

mqttServ.attachHttpServer(httpServ);

// fired when a client connects
mqttServ.on("clientConnected", function(client) {
  console.log("Client Connected:", client.id);
});

// fired when a message is published
mqttServ.on("published", function(packet, client) {
  console.log("Published", packet);
  console.log("Client", client);
});

httpServ.listen(3000);
