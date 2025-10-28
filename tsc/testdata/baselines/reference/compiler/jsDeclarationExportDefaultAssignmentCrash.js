//// [tests/cases/compiler/jsDeclarationExportDefaultAssignmentCrash.ts] ////

//// [index.js]
exports.default = () => {
    return 1234;
}


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
export var default = () => {
    return 1234;
};
exports.default = () => {
    return 1234;
};


//// [index.d.ts]
declare const _default: () => number;
export default _default;
