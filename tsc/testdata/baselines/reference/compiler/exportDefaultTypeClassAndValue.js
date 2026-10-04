//// [tests/cases/compiler/exportDefaultTypeClassAndValue.ts] ////

//// [exportDefaultTypeClassAndValue.ts]
const foo = 1
export default foo
export default class Foo {}
type Bar = {}
export default Bar


//// [exportDefaultTypeClassAndValue.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foo = 1;
exports.default = foo;
class Foo {
}
exports.default = Foo;
