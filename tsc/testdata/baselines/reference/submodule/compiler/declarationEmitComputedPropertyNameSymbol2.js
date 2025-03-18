//// [tests/cases/compiler/declarationEmitComputedPropertyNameSymbol2.ts] ////

//// [type.ts]
namespace Foo {
  export const sym = Symbol();
}
export type Type = { x?: { [Foo.sym]: 0 } };

//// [index.ts]
import { type Type } from "./type";

export const foo = { ...({} as Type) };


//// [type.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Foo;
(function (Foo) {
    Foo.sym = Symbol();
})(Foo || (Foo = {}));
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = void 0;
exports.foo = { ...{} };
