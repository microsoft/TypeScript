/// <reference path='fourslash.ts' />

//// namespace N {
////     const enum Inaccessible {
////         member
////     };
////     export const enum Accessible {
////         member
////     };
////     export abstract class A {
////         abstract x: Inaccessible;
////         abstract y: Inaccessible.member;
////         abstract z: Accessible;
////         abstract w: Accessible.member;
////     }
//// }
////
//// class C extends N.A {[| |]}

verify.rangeAfterCodeFix(`
    z: N.Accessible;
    w: N.Accessible;
`);
