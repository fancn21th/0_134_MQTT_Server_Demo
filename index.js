// var mosca = require("mosca");
// var server = new mosca.Server({
//   http: {
//     port: 3000,
//     bundle: true,
//     static: "./",
//   },
// });

/*
  mqttServ 作为 mqtt 模拟服务器
*/

const http = require("http");
const httpServ = http.createServer();
const mosca = require("mosca");
const mqttServ = new mosca.Server({});
const port = 3000;
const historian = require("./data/historian.json");
let t = null;
const topic = "/foo";

mqttServ.attachHttpServer(httpServ);

httpServ.listen(port);

mqttServ.on("ready", setup);

// Sending data from mosca to clients
// var message = {
//   topic: "/hello/world",
//   payload: "abcde", // or a Buffer
//   qos: 0, // 0, 1, or 2
//   retain: false, // or true
// };

const sendData = () => {
  const message = {
    topic: topic,
    payload: historian,
    qos: 0,
    retain: false,
  };
  mqttServ.publish(message, function () {
    console.log("信息发布完成!");
  });
};

const sendDataInfinitely = () => {
  t = setInterval(() => {
    sendData();
  }, 5000);
};

mqttServ.on("clientConnected", function (client) {
  console.log("客户端连接成功, id:", client.id);
  sendDataInfinitely();
});

// fired when a message is received
mqttServ.on("published", function (packet, client) {
  console.log(
    "信息发布成功!",
    // client.id,
    JSON.stringify(packet.payload)
  );
});

// fired when the mqtt server is ready
function setup() {
  console.log("Mosca server 启动运行在端口:", port);
  console.log("========================================");
}
