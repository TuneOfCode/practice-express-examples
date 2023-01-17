"use strict";

const vhost = require("vhost");
/**
 * mail.example.com --> subdomain
 * api.example.com --> subdomain
 * example.com --> domain
 */

const runAppVhost = (app) => {
  // domain
  const domain = require("express")();
  domain.get("/", (req, res) => {
    return res.status(200).json({
      message: `Bạn đang truy cập đến domain: 'http://example.com'`,
    });
  });
  domain.get("/:subdomain", (req, res) => {
    return res.status(200).json({
      message: `Bạn đang truy cập đến domain: 'http://${req.params.subdomain}.example.com'`,
    });
  });
  domain.listen(80);

  // subdomain
  const subdomain = require("express")();
  subdomain.use((req, res) => {
    console.log("===> infor vhost: ", req.vhost);
    return res.redirect(`http://localhost/${req.vhost[0]}`);
  });

  // subdomain: *.example.com
  // ex: api.localhost:2222 | mail.localhost:2222
  // --> localhost/api | localhost/mail
  app.use(vhost("*.localhost", subdomain));

  // domain: 'example.com'
  app.use(vhost("localhost", domain));
};

module.exports = runAppVhost;
