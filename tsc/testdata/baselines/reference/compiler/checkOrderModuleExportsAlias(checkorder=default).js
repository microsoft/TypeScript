//// [tests/cases/compiler/checkOrderModuleExportsAlias.ts] ////

//// [index.js]
module.exports.i = function i() {}
module.exports.ii = module.exports.i;


//// [index.js]
"use strict";
module.exports.i = function i() { };
module.exports.ii = module.exports.i;


//// [index.d.ts]
export declare var i: () => void;
export declare var ii: () => void;
