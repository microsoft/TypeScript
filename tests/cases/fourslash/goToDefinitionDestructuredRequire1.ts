/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: util.js
//// class /*2*/Util {}
//// module.exports = { Util };

// @Filename: index.js
//// const { Util } = require('./util');
//// new [|Util/*1*/|]()

verify.baselineGoToDefinition("1");
