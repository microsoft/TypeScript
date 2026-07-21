// @allowJs: true
// @checkJs: true
// @target: es2015
// @outDir: ./out
// @declaration: true

// @filename: local-lib/ModuleGraphConnection.js
/** @typedef {typeof T} T */
const T = Symbol();
module.exports = class ModuleGraphConnection {};
module.exports.T = T;

// @filename: repro.js
'use strict';
/** @typedef {import('./local-lib/ModuleGraphConnection')} ImportedType */
/** @type {ImportedType} */
module.exports = class Repro {};
