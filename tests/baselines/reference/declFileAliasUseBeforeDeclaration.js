//// [tests/cases/compiler/declFileAliasUseBeforeDeclaration.ts] ////

//// [declFileAliasUseBeforeDeclaration_foo.ts]
export class Foo { }

//// [declFileAliasUseBeforeDeclaration_test.ts]
export function bar(a: foo.Foo) { }
import foo = require("./declFileAliasUseBeforeDeclaration_foo");

//// [declFileAliasUseBeforeDeclaration_foo.js]
"use strict";
exports.__esModule = true;
exports.Foo = void 0;
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
exports.Foo = Foo;
//// [declFileAliasUseBeforeDeclaration_test.js]
"use strict";
exports.__esModule = true;
exports.bar = void 0;
function bar(a) { }
exports.bar = bar;


//// [declFileAliasUseBeforeDeclaration_foo.d.ts]
export declare class Foo {
}
//// [declFileAliasUseBeforeDeclaration_test.d.ts]
export declare function bar(a: foo.Foo): void;
import foo = require("./declFileAliasUseBeforeDeclaration_foo");
