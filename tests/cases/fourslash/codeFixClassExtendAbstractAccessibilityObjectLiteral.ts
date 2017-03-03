/// <reference path='fourslash.ts' />

//// namespace N {
////     const enum Inaccessible = { member };
////     export const enum Accessible {
////         member
////     };
////     export abstract class A {
////         abstract x: { n: number, i: Inaccessible, s: string };
////         abstract y: { n: number, a: Accessible };
////     }
//// }
////
//// class C extends N.A {[| |]}

verify.rangeAfterCodeFix(`
    y: { n: number; a: N.Accessible; };
`);

type T = {u: U};
type U = {t: T};