//// [tests/cases/compiler/duplicateVarAndImport2.ts] ////

//// [duplicateVarAndImport2.ts]
// error since module is instantiated
var a;
module M { export var x = 1; }
import a = M;

//// [duplicateVarAndImport2.js]
// error since module is instantiated
var a;
var M;
(function (M) {
    M.x = 1;
})(M || (M = {}));
var a = M;
