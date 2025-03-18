//// [tests/cases/compiler/declFileAliasUseBeforeDeclaration.ts] ////

//// [declFileAliasUseBeforeDeclaration_foo.ts]
export class Foo { }

//// [declFileAliasUseBeforeDeclaration_test.ts]
export function bar(a: foo.Foo) { }
import foo = require("./declFileAliasUseBeforeDeclaration_foo");

//// [declFileAliasUseBeforeDeclaration_foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
class Foo {
}
exports.Foo = Foo;
//// [declFileAliasUseBeforeDeclaration_test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = bar;
function bar(a) { }
