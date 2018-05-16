/* eslint no-empty-function: 0  */

"use strict";

var memoize = require("../plain");

module.exports = function (t, a) {
	memoize(function () {})();
	memoize(function () {}, { profileName: "test" })();
	a(typeof t.statistics, "object", "Access to statistics");
	a(Object.keys(t.statistics).length, 2, "Statistics collected including named function");
	a(typeof t.log, "function", "Access to log function");
	a(typeof t.log(), "string", "Log outputs string");
};
