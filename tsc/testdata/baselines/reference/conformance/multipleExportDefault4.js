//// [tests/cases/conformance/externalModules/multipleExportDefault4.ts] ////

//// [multipleExportDefault4.ts]
export default class C { }

export default {
    uhoh: "another default",
};

//// [multipleExportDefault4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C {
}
exports.default = C;
exports.default = {
    uhoh: "another default",
};
