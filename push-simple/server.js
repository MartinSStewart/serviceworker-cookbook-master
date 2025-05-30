// Use the web-push library to hide the implementation details of the communication
// between the application server and the push service.
// For details, see https://tools.ietf.org/html/draft-ietf-webpush-protocol and
// https://tools.ietf.org/html/draft-ietf-webpush-encryption.
const webPush = require("web-push");



var VAPID_PUBLIC_KEY = "BKUb_vkU2YRb7d-ybxMoJ44-21RAhTHufbZ_szx2yEYtx6OosuQ0goTngtjkJiw1vs0Y5p7Y5A8c43xuLNQm4_E"
var VAPID_PRIVATE_KEY = "95RlptcaIk5N2YbDgTJV8iNdkb6e7pAkWa7EVYwJQvE"
// Set the keys used for encrypting the push messages.
webPush.setVapidDetails(
  "https://example.com/",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

module.exports = function (app, route) {
  app.get(route + "vapidPublicKey", function (req, res) {
    res.send(VAPID_PUBLIC_KEY);
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
