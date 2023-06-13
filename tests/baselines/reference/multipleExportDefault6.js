//// [tests/cases/conformance/externalModules/multipleExportDefault6.ts] ////

//// [multipleExportDefault6.ts]
export default {
    lol: 1
}

export default {
    lol: 2
}

//// [multipleExportDefault6.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    lol: 1
};
exports.default = {
    lol: 2
};
