//// [tests/cases/compiler/declarationEmitComputedPropertyNameEnum1.ts] ////

//// [type.ts]
export enum Enum {
  A = "a",
  B = "b"
}

export type Type = { x?: { [Enum.A]: 0 } };

//// [index.ts]
import { type Type } from "./type";

export const foo = { ...({} as Type) };


//// [type.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enum = void 0;
var Enum;
(function (Enum) {
    Enum["A"] = "a";
    Enum["B"] = "b";
})(Enum || (exports.Enum = Enum = {}));
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = void 0;
exports.foo = { ...{} };
