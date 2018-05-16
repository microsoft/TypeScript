/*
 * Utilities: A classic collection of JavaScript utilities
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/
var http = require('http')
  , https = require('https')
  , url = require('url')
  , uri = require('./uri')
  , log = require('./log')
  , core = require('./core');

/**
  @name request
  @namespace request
  @public
  @function
  @description Sends requests to the given url sending any data if the method is POST or PUT
  @param {Object} opts The options to use for the request
    @param {String} [opts.url] The URL to send the request to
    @param {String} [opts.method=GET] The method to use for the request
    @param {Object} [opts.headers] Headers to send on requests
    @param {String} [opts.data] Data to send on POST and PUT requests
    @param {String} [opts.dataType] The type of data to send
  @param {Function} callback the function to call after, args are `error, data`
*/
var request = function (opts, callback) {
  var client
    , options = opts || {}
    , parsed = url.parse(options.url)
    , path
    , requester = parsed.protocol == 'http:' ? http : https
    , method = (options.method && options.method.toUpperCase()) || 'GET'
    , headers = core.mixin({}, options.headers || {})
    , data = options.data
    , contentLength
    , port
    , clientOpts;

  if (parsed.port) {
    port = parsed.port;
  }
  else {
    port = parsed.protocol == 'http:' ? '80' : '443';
  }

  path = parsed.pathname;

  if (method == 'POST' || method == 'PUT') {
    // Handle the payload and content-length
    if (data) {
      // JSON data
      if (options.dataType == 'json') {
        if (typeof data == 'object') {
          data = JSON.stringify(data);
        }
        headers['Content-Type'] = headers['Content-Type'] ||
            headers['content-type'] || 'application/json';
      }
      // Form data
      else {
        if (typeof data == 'object') {
          data = uri.paramify(data);
        }
        // FIXME: What is the prefix for form-urlencoded?
        headers['Content-Type'] = headers['Content-Type'] ||
            headers['content-type'] || 'form-urlencoded';
      }
      contentLength = Buffer.byteLength(data);
    }
    else {
      contentLength = 0
    }
    headers['Content-Length'] = contentLength;

    if (parsed.search) {
      path += parsed.search;
    }
  }
  else {
    if (data) {
      // Data is an object, parse into querystring
      if (typeof data == 'object') {
        data = uri.paramify(data);
      }
      // Create querystring or append to existing
      if (parsed.search) {
        path += parsed.search; // search includes question mark
        path += '&' + data;
      }
      else {
        path += '?' + data;
      }
    }
  }

  clientOpts = {
    host: parsed.hostname
  , port: port
  , method: method
  , agent: false
  , path: path
  , headers: headers
  };
  client = requester.request(clientOpts);

  client.addListener('response', function (resp) {
    var data = '';

    resp.addListener('data', function (chunk) {
      data += chunk.toString();
    });

    resp.addListener('end', function () {
      var stat = resp.statusCode
        , contentType
        , err;
      // Successful response
      if ((stat > 199 && stat < 300) || stat == 304) {
        if (data) {
          contentType = resp.headers['Content-Type'];
          if (contentType == 'application/json' || contentType == 'text/json' ||
            uri.getFileExtension(parsed.pathname) == 'json') {
            try {
                data = JSON.parse(data);
            }
            catch (e) {
              return callback(e, null);
            }
          }
          callback(null, data);
        }
        else {
          callback(null, null);
        }
      }
      // Something failed
      else {
        err = new Error(data);
        err.statusCode = resp.statusCode;
        callback(err, null);
      }

    });
  });

  client.addListener('error', function (e) {
    callback(e, null);
  });

  if ((method == 'POST' || method == 'PUT') && data) {
    client.write(data);
  }

  client.end();
};

module.exports = request;
