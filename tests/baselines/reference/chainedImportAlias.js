//// [tests/cases/compiler/chainedImportAlias.ts] ////

//// [chainedImportAlias_file0.ts]
export module m {
    export function foo() { }
}

//// [chainedImportAlias_file1.ts]
import x = require('chainedImportAlias_file0');
import y = x;
y.m.foo();


//// [chainedImportAlias_file0.js]
var m;
(function (m) {
    function foo() {
    }
    m.foo = foo;
})(m = exports.m || (exports.m = {}));
//// [chainedImportAlias_file1.js]
var x = require('chainedImportAlias_file0');
var y = x;
y.m.foo();
