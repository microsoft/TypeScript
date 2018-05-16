"use strict";

var includes      = require("../array/#/contains")
  , uniq          = require("../array/#/uniq")
  , objForEach    = require("./for-each")
  , isPlainObject = require("./is-plain-object")
  , ensureValue   = require("./valid-value");

var isArray = Array.isArray, slice = Array.prototype.slice;

var deepAssign = function (target, source) {
	if (isPlainObject(target)) {
		if (!isPlainObject(source)) return source;
		objForEach(source, function (value, key) {
			target[key] = deepAssign(target[key], value);
		});
		return target;
	}
	if (isArray(target)) {
		if (!isArray(source)) return source;
		source.forEach(function (item) {
			if (!includes.call(target, item)) target.push(item);
		});
		return target;
	}
	return source;
};

module.exports = function (target /*, ...objects*/) {
	return uniq
		.call([ensureValue(target)].concat(slice.call(arguments, 1).map(ensureValue)))
		.reduce(deepAssign);
};
