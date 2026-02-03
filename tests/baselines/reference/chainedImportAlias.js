//// [tests/cases/compiler/chainedImportAlias.ts] ////

//// [chainedImportAlias_file0.ts]
export module m {
    export function foo() { }
}

//// [chainedImportAlias_file1.ts]
import x = require('./chainedImportAlias_file0');
import y = x;
y.m.foo();


//// [chainedImportAlias_file0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.m = void 0;
var m;
(function (m) {
    function foo() { }
    m.foo = foo;
})(m || (exports.m = m = {}));
//// [chainedImportAlias_file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var x = require("./chainedImportAlias_file0");
var y = x;
y.m.foo();
