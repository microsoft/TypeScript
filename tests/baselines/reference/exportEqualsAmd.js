//// [tests/cases/compiler/exportEqualsAmd.ts] ////

//// [exportEqualsAmd.ts]
export = { ["hi"]: "there" };

//// [exportEqualsAmd.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    return { ["hi"]: "there" };
});
