var mosca = require("mosca");
var server = new mosca.Server({
  http: {
    port: 3000,
    bundle: true,
    static: "./",
  },
});
