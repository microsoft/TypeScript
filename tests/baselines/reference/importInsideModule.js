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
exports.__esModule = true;
exports.myModule = void 0;
var myModule;
(function (myModule) {
    var a = foo.x;
})(myModule = exports.myModule || (exports.myModule = {}));
