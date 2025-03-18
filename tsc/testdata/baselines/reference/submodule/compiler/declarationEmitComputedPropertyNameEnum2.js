//// [tests/cases/compiler/declarationEmitComputedPropertyNameEnum2.ts] ////

//// [type.ts]
export type Type = { x?: { [Enum.A]: 0 } };

//// [index.ts]
import { type Type } from "./type";

export const foo = { ...({} as Type) };


//// [type.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = void 0;
exports.foo = { ...{} };
