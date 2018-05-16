'use strict';
var path = require('path');
var osHomedir = require('os-homedir');
var home = osHomedir();

module.exports = function (str) {
	str = path.normalize(str) + path.sep;
	return (str.indexOf(home) === 0 ? str.replace(home + path.sep, '~' + path.sep) : str).slice(0, -1);
};
