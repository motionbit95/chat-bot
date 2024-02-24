const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy("/api", {
      target: "https://port-0-chat-bot-17xco2nlszge3vt.sel5.cloudtype.app/",
    })
  );
};
