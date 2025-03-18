//// [tests/cases/compiler/declarationEmitComputedPropertyNameEnum3.ts] ////

//// [type.ts]
export namespace Foo {
  export enum Enum {
    A = "a",
    B = "b",
  }
}
export type Type = { x?: { [Foo.Enum]: 0 } };

//// [index.ts]
import { type Type } from "./type";

export const foo = { ...({} as Type) };


//// [type.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
var Foo;
(function (Foo) {
    let Enum;
    (function (Enum) {
        Enum["A"] = "a";
        Enum["B"] = "b";
    })(Enum = Foo.Enum || (Foo.Enum = {}));
})(Foo || (exports.Foo = Foo = {}));
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = void 0;
exports.foo = { ...{} };
