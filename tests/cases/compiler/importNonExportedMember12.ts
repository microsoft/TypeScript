// @esModuleInterop: true
// @moduleResolution: node
// @module: es2015
// @checkJs: true
// @allowJs: true
// @noEmit: true

// @Filename: /node_modules/foo/package.json
{ "name": "foo", "version": "1.2.3", "main": "src/index.js" }

// @Filename: /node_modules/foo/src/index.js
module.exports = 1;

// @filename: /a.js
export const A = require("foo");

// @filename: /b.ts
import { A } from "./a";
