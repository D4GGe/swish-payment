
const fs = require("fs");
const _ = require("lodash");
var request = require('request');
const urls = {
  payment: "https://mss.cpc.getswish.net/swishcpcapi/api/v1/paymentrequests/",
  refund: "https://mss.swicpc.bankgirot.se/swish-cpcapi/api/v1/refunds/"
};

var cert;
var conf = {
  curency: "SEK",
  payeeAlias: null,
  callbackUrl: null

};

exports.setCert = incert => {
  cert = {
    key: fs.readFileSync(incert.key, 'ascii'),
    cert: fs.readFileSync(incert.cert, 'ascii'),
    ca: fs.readFileSync(incert.ca, 'ascii'),
    passphrase: incert.passphrase
  }
  return cert;
}

exports.config = config => {
  _.merge(conf, config)
  return conf;
}


exports.get = function (id) {
  return new Promise(function (resolve, reject) {
    var options;
    options = R.merge(config.cert, {
      method: 'get',
      url: urls.payment + id
    });
    return request(options, function (err, response) {
      if (response.statusCode === 200) {
        return resolve(JSON.parse(response.body));
      } else {
        return reject({
          code: response.statusCode,
          message: response.statusMessage
        });
      }
    });
  });
};

exports.add = function (data) {
  let options = {
    uri: "https://www.bzzt.se",
    url: "https://mss.cpc.getswish.net/swishcpcapi/api/v1/paymentrequests/",
    body: {
      payeePaymentReference: "0123456789",
      curency: conf.curency,
      payerAlias: "0767999354",
      payeeAlias: conf.payeeAlias,
      callbackUrl: conf.callbackUrl,
      amount: "10",
      message: "BE18",
    },
    key: cert.key,
    cert: cert.cert,
    passphrase: cert.passphrase,
    agentOptions: {
      ca: cert.ca,
    },
    ca: cert.ca,
    json: true
  };
  request.get(options, (ans, err) => console.log(ans))

};
