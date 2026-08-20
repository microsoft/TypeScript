//// [tests/cases/compiler/exportEqualsCommonJs.ts] ////

//// [exportEqualsCommonJs.ts]
export = { ["hi"]: "there" };

//// [exportEqualsCommonJs.js]
"use strict";
module.exports = { ["hi"]: "there" };
