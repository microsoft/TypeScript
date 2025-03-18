//// [tests/cases/compiler/exportEqualsAmd.ts] ////

//// [exportEqualsAmd.ts]
export = { ["hi"]: "there" };

//// [exportEqualsAmd.js]
"use strict";
module.exports = { ["hi"]: "there" };
