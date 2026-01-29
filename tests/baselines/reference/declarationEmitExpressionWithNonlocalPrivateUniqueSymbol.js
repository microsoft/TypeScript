//// [tests/cases/compiler/declarationEmitExpressionWithNonlocalPrivateUniqueSymbol.ts] ////

//// [a.ts]
type AX = { readonly A: unique symbol };
export const A: AX = 0 as any;
//// [b.ts]
import { A } from './a';
export const A1 = A;

//// [a.js]
export const A = 0;
//// [b.js]
import { A } from './a';
export const A1 = A;


//// [a.d.ts]
type AX = {
    readonly A: unique symbol;
};
export declare const A: AX;
export {};
