//// [tests/cases/compiler/modulePrologueUmd.ts] ////

//// [modulePrologueUmd.ts]
"use strict";

export class Foo {}

//// [modulePrologueUmd.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
class Foo {
}
exports.Foo = Foo;
