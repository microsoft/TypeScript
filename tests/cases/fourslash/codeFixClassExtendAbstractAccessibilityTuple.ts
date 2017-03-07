/// <reference path='fourslash.ts' />

//// namespace N {
////     const enum Inaccessible {
////         member
////     };
////     export abstract class A {
////         abstract x: [number, Inaccessible, string];
////         abstract y: [number, Inaccessible.member];
////         abstract z: [number, string, this];
////     }
//// }
////
//// class C extends N.A {[| |]}

verify.rangeAfterCodeFix(`
    z: [number, string, this];
`);
