//// [tests/cases/compiler/modulePrologueSystem.ts] ////

//// [modulePrologueSystem.ts]
"use strict";

export class Foo {}

//// [modulePrologueSystem.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
class Foo {
}
exports.Foo = Foo;
