/// <reference path='fourslash.ts' />

//// class A {
////     method(a: number, b: string): boolean;
////     method(a: string | number, b?: string | number): boolean | Function { return true; }
////
//// class C implements A {[| |]}

verify.rangeAfterCodeFix(`
    method(a: number, b: string): boolean;
    method(a: string | number, b?: string | number): boolean | Function {
        throw new Error("Method not implemented.");
    }
`);
