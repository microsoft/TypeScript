//// [tests/cases/conformance/externalModules/multipleExportDefault2.ts] ////

//// [multipleExportDefault2.ts]
export default {
    uhoh: "another default",
};

export default function Foo() { }



//// [multipleExportDefault2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Foo;
exports.default = {
    uhoh: "another default",
};
function Foo() { }
