//// [tests/cases/compiler/exportEqualsUmd.ts] ////

//// [exportEqualsUmd.ts]
export = { ["hi"]: "there" };

//// [exportEqualsUmd.js]
"use strict";
module.exports = { ["hi"]: "there" };
