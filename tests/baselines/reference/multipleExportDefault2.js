//// [multipleExportDefault2.ts]
export default {
    uhoh: "another default",
};

export default function Foo() { }



//// [multipleExportDefault2.js]
"use strict";
exports.__esModule = true;
exports["default"] = {
    uhoh: "another default"
};
function Foo() { }
exports["default"] = Foo;
