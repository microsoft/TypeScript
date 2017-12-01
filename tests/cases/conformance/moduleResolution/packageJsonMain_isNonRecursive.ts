// @noImplicitReferences: true
// @currentDirectory: /
// @traceResolution: true

// @filename: /node_modules/foo/package.json
{ "main": "oof" }

// @filename: /node_modules/foo/oof/package.json
{ "main": "ofo" }

// @filename: /node_modules/foo/oof/ofo.js
module.exports = 0;

// @filename: /a.ts
import foo = require("foo");
