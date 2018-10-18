//// [dynamicImportInDefaultExportExpression.ts]
export default {
    getInstance: function () {
        return import('./foo2');
    }
}

//// [dynamicImportInDefaultExportExpression.js]
"use strict";
exports.__esModule = true;
exports["default"] = {
    getInstance: function () {
        return Promise.resolve().then(function () { return require('./foo2'); });
    }
};
