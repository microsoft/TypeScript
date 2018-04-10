//// [tests/cases/compiler/declarationEmitWillUseAliasForName.ts] ////

//// [a.ts]
export interface I { x: number; }
export type J = I;

//// [b.ts]
import { J } from './a';
export const f = (): J => ({ x: 0 });


//// [a.js]
"use strict";
exports.__esModule = true;
//// [b.js]
"use strict";
exports.__esModule = true;
exports.f = function () { return ({ x: 0 }); };


//// [a.d.ts]
export interface I {
    x: number;
}
export declare type J = I;
//// [b.d.ts]
import { J } from './a';
export declare const f: () => J;
