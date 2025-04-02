//// [tests/cases/compiler/dynamicImportInDefaultExportExpression.ts] ////

//// [dynamicImportInDefaultExportExpression.ts]
export default {
    getInstance: function () {
        return import('./foo2');
    }
}

//// [dynamicImportInDefaultExportExpression.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getInstance: function () {
        return Promise.resolve().then(function () { return require('./foo2'); });
    }
};
