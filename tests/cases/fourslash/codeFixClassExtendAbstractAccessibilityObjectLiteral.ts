/// <reference path='fourslash.ts' />

//// namespace N {
////     const enum Inaccessible = { member };
////     export const enum Accessible {
////         member
////     };
////     export abstract class A {
////         abstract x: {}
////         abstract y: { n: number, i: Inaccessible, s: string };
////         abstract z: { n: number, a: Accessible };
////     }
//// }
////
//// class C extends N.A {[| |]}

verify.rangeAfterCodeFix(`
    x: {};
    z: { n: number; a: N.Accessible; };
`);

type T = {u: U};
type U = {t: T};
