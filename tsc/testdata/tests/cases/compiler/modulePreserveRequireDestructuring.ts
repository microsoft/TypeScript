// @target: esnext
// @module: preserve
// @moduleResolution: bundler
// @verbatimModuleSyntax: true
// @allowJs: true
// @checkJs: true
// @noEmit: true

// @filename: dep.cjs
module.exports.readFile = function () {};

// @filename: main.cjs
// CommonJS `require` is not ESM syntax, in destructured or plain form.
const { readFile } = require("./dep.cjs");
const dep = require("./dep.cjs");
readFile;
dep;

// @filename: esm.cjs
// Genuine ESM syntax in a CommonJS file must still be an error.
import { readFile as fromEsm } from "./dep.cjs";
fromEsm;
