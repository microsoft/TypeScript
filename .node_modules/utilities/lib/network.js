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

var network
	, net = require('net');

/**
  @name network
  @namespace network
*/

network = new (function () {
	/**
		@name network#isPortOpen
		@public
		@function
		@description Checks if the given port in the given host is open
		@param {Number} port number
		@param {String} host
		@param {Function} callback Callback function -- should be in the format
			of function(err, result) {}
	*/
	this.isPortOpen = function (port, host, callback) {
		if (typeof host === 'function' && !callback) {
			callback = host;
			host = 'localhost';
		}

		var isOpen = false
			, connection
			, error;

		connection = net.createConnection(port, host, function () {
			isOpen = true;
			connection.end();
		});

		connection.on('error', function (err) {
			// We ignore 'ECONNREFUSED' as it simply indicates the port isn't open.
			// Anything else is reported
			if(err.code !== 'ECONNREFUSED') {
				error = err;
			}
		});

		connection.setTimeout(400, function () {
			connection.end();
		});

		connection.on('close', function () {
			callback && callback(error, isOpen);
		});
	};

})();

module.exports = network;