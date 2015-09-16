// @module: commonjs

// @Filename: elidingImportNames_test.ts
import a = require('./elidingImportNames_main'); // alias used in typeof
var b = a;
var x: typeof a;
import a2 = require('./elidingImportNames_main1'); // alias not used in typeof
var b2 = a2;


// @Filename: elidingImportNames_main.ts
export var main = 10;

// @Filename: elidingImportNames_main1.ts
export var main = 10;