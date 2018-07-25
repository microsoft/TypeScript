// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: mod1.js

// error

/** @typedef {number} Foo */
class Foo { } // should error

/** @typedef {number} Bar */
exports.Bar = class { }

/** @typedef {number} Baz */
module.exports = {
    Baz: class { }
}

// ok

/** @typedef {number} Qux */
var Qux = 2;

/** @typedef {number} Quid */
exports.Quid = 2;

/** @typedef {number} Quack */
module.exports = {
    Quack: 2
}

// @Filename: use.js

var mod = require('./mod1.js');
/** @type {import("./mod1.js").Baz} */
var b;
/** @type {mod.Baz} */
var bb;
var bbb = new mod.Baz();
