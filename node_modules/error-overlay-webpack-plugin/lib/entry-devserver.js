"use strict";

var _querystring = _interopRequireDefault(require("querystring"));

var _url = _interopRequireDefault(require("url"));

var _sockjsClient = _interopRequireDefault(require("sockjs-client"));

var _formatWebpackMessages = _interopRequireDefault(require("react-dev-utils/formatWebpackMessages"));

var _reactErrorOverlay = require("react-error-overlay");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* global __resourceQuery */
var sockOptions = {};

if (typeof __resourceQuery === 'string' && __resourceQuery) {
  sockOptions = _querystring["default"].parse(__resourceQuery.substr(1));
}

var connection = new _sockjsClient["default"](_url["default"].format({
  protocol: window.location.protocol,
  hostname: sockOptions.sockHost || window.location.hostname,
  port: sockOptions.sockPort || window.location.port,
  pathname: sockOptions.sockPath || '/sockjs-node'
}));

connection.onmessage = function onmessage(e) {
  var _JSON$parse = JSON.parse(e.data),
      type = _JSON$parse.type,
      data = _JSON$parse.data;

  var formatted;

  switch (type) {
    case 'ok':
      (0, _reactErrorOverlay.dismissBuildError)();
      break;

    case 'errors':
      formatted = (0, _formatWebpackMessages["default"])({
        errors: data,
        warnings: []
      });
      (0, _reactErrorOverlay.reportBuildError)(formatted.errors[0]);
      break;

    default: // Do nothing.

  }
};