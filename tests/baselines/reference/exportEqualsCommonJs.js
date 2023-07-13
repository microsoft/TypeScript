//// [tests/cases/compiler/exportEqualsCommonJs.ts] ////

//// [exportEqualsCommonJs.ts]
export = { ["hi"]: "there" };

//// [exportEqualsCommonJs.js]
"use strict";
var _a;
module.exports = (_a = {}, _a["hi"] = "there", _a);
