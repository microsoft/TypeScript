/// <reference path='fourslash.ts' />


//// namespace N {
////     const enum Enum {
////         none = 0,
////         x = 1,
////         y = 2,
////         z = 4
////         // none,x,y,z,
////         // w = 10
////     };
////     export abstract class A {
////         abstract x: Enum;
////     }
//// }
////
////
////
//// class C extends N.A {[| |]}

verify.not.codeFixAvailable();
