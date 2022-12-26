//// [tests/cases/compiler/declarationEmitExpressionWithNonlocalPrivateUniqueSymbol.ts] ////

//// [a.ts]
type AX = { readonly A: unique symbol };
export const A: AX = 0 as any;
//// [b.ts]
import { A } from './a';
export const A1 = A;

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
exports.A = 0;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A1 = void 0;
var a_1 = require("./a");
exports.A1 = a_1.A;


//// [a.d.ts]
type AX = {
    readonly A: unique symbol;
};
export declare const A: AX;
export {};
