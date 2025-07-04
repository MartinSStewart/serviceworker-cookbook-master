// Use the web-push library to hide the implementation details of the communication
// between the application server and the push service.
// For details, see https://tools.ietf.org/html/draft-ietf-webpush-protocol and
// https://tools.ietf.org/html/draft-ietf-webpush-encryption.
const webPush = require("web-push");
const crypto = require('crypto');

console.log(webPush);

module.exports = function (app, route) {
  app.get(route + "vapidPublicKey", function (req, res) {
    res.send(webPush.webPush.webPushKeys.publicKey);
  });

  app.post(route + "register", function (req, res) {
    // A real world application would store the subscription info.
    res.sendStatus(201);
  });

  app.post(route + "sendNotification", function (req, res) {
    const subscription = req.body.subscription;
    const payload = null;

    setTimeout(function () {
      webPush
        .sendNotification(subscription, payload)
        .then(function () {
          res.sendStatus(201);
        })
        .catch(function (error) {
          res.sendStatus(500);
          console.log(error);
        });
    }, req.body.delay * 1000);
  });
};
