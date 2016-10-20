//// [exportEqualsAmd.ts]
export = { ["hi"]: "there" };

//// [exportEqualsAmd.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    return _a = {}, _a["hi"] = "there", _a;
    var _a;
});
