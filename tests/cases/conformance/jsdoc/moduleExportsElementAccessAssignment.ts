// @allowJs: true
// @noEmit: true
// @strict: true
// @checkJs: true
// @filename: mod1.js
exports.a = {};
exports['b'] = {};
exports['default'] = {};
module['exports'].c = {};
module['exports']['d'] = {};

// @filename: mod2.js
const mod1 = require('./mod1');
mod1.a;
mod1.b;
mod1.c;
mod1.d;
mod1.default;
