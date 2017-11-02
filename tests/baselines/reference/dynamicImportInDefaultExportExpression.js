//// [dynamicImportInDefaultExportExpression.ts]
export default {
    getInstance: function () {
        return import('./foo2');
    }
}

//// [dynamicImportInDefaultExportExpression.js]
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
exports.__esModule = true;
exports["default"] = {
    getInstance: function () {
        return Promise.resolve().then(function () { return __importStar(require('./foo2')); });
    }
};
