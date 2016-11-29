/// <reference path='fourslash.ts' />

//// namespace N1 {
////     export interface I1 {
////         f1():string;
////     }
//// }
//// interface I1 {
////     f1();
//// }
////
//// class C1 implements N1.I1 {[|
//// |]}

//// interface I {
////     method(a: number, b: string): boolean;
////     method(a: string, b: number): Function;
////     method(a: string): Function;
//// }
////
//// class C implements I {[| |]}

verify.rangeAfterCodeFix(`
    method(a: number, b: string): boolean;
    method(a: string, b: number): Function;
    method(a: string): Function;
    method(a: number | string, b?: string | number): boolean | Function {
        throw new Error("Method not implemented");
    }
`);
