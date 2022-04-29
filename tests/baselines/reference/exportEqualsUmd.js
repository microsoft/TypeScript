//// [exportEqualsUmd.ts]
export = { ["hi"]: "there" };

//// [exportEqualsUmd.js]
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _a;
    return (_a = {}, _a["hi"] = "there", _a);
});
