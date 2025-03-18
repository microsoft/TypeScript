//// [tests/cases/compiler/modulePrologueAMD.ts] ////

//// [modulePrologueAMD.ts]
"use strict";

export class Foo {}

//// [modulePrologueAMD.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
class Foo {
}
exports.Foo = Foo;
