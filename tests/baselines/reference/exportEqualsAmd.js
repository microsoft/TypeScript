//// [tests/cases/compiler/exportEqualsAmd.ts] ////

//// [exportEqualsAmd.ts]
export = { ["hi"]: "there" };

//// [exportEqualsAmd.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var _a;
    return (_a = {}, _a["hi"] = "there", _a);
});
