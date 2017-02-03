//// [multipleExportDefault2.ts]
export default {
    uhoh: "another default",
};

export default function Foo() { }



//// [multipleExportDefault2.js]
"use strict";
exports["default"] = {
    uhoh: "another default"
};
function Foo() { }
exports["default"] = Foo;
exports.__esModule = true;
