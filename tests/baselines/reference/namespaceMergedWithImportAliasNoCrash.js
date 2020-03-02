//// [tests/cases/compiler/namespaceMergedWithImportAliasNoCrash.ts] ////

//// [file1.ts]
export namespace Library {
    export type Bar = { a: number };
}
var x: Library.Bar; // should work
Library.foo; // should be an error
//// [file2.ts]
import * as Lib from './file1';
namespace Lib { // should fail to merge
    export const foo: string = "";
}
Lib.foo; // should work
var x: Lib.Bar; // should be an error
export { Lib }

//// [file1.js]
"use strict";
exports.__esModule = true;
var x; // should work
Library.foo; // should be an error
//// [file2.js]
"use strict";
exports.__esModule = true;
exports.Lib = void 0;
var Lib;
(function (Lib) {
    Lib.foo = "";
})(Lib || (Lib = {}));
exports.Lib = Lib;
Lib.foo; // should work
var x; // should be an error
