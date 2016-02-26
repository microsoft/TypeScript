//// [exportEqualsCommonJs.ts]
export = { ["hi"]: "there" };

//// [exportEqualsCommonJs.js]
"use strict";
module.exports = (_a = {}, _a["hi"] = "there", _a);
var _a;
