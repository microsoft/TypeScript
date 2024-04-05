//// [tests/cases/compiler/importInsideModule.ts] ////

//// [importInsideModule_file1.ts]
export var x = 1;

//// [importInsideModule_file2.ts]
export module myModule {
    import foo = require("importInsideModule_file1");
    var a = foo.x;
}

//// [importInsideModule_file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myModule = void 0;
var myModule;
(function (myModule) {
    var a = foo.x;
})(myModule || (exports.myModule = myModule = {}));
