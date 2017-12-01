// @noImplicitReferences: true
// @currentDirectory: /
// @traceResolution: true

// @filename: /node_modules/foo/package.json
{ "main": "oof" }

// @filename: /node_modules/foo/oof.js
module.exports = 0;

// @filename: /node_modules/bar/package.json
{ "main": "rab.js" }

// @filename: /node_modules/bar/rab.js
module.exports = 0;

// @filename: /node_modules/baz/package.json
{ "main": "zab" }

// @filename: /node_modules/baz/zab/index.js
module.exports = 0;

// @filename: /a.ts
import foo = require("foo");
import bar = require("bar");
import baz = require("baz");
foo + bar + baz;
