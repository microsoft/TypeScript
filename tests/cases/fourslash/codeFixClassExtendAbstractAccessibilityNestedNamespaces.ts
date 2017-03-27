/// <reference path='fourslash.ts' />

//// namespace N {
////     export namespace M {
////         interface I1 { }
////         export interface I2 { }
////     }
////     namespace P {
////         interface I3 { }
////         export interface I4 { }
////     }
////     interface Inaccessible {
////         x: M.I2;
////         y: P.I4;
////     }
////     export interface Accessible {
////         x: M.I2;
////         y: P.I4;
////     }
//// }
//// class C implements N.Accessible {[| |]}

verify.rangeAfterCodeFix(`
    x: N.M.I2;
`);