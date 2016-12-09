/// <reference path='fourslash.ts' />

//// interface I {
////     method(a: number, ...b: string[]): boolean;
////     method(a: string, ...b: number[]): Function;
////     method(a: string): Function;
//// }
////
//// class C implements I {[| |]}

verify.rangeAfterCodeFix(`
    method(a: number, ...b: string[]): boolean;
    method(a: string, ...b: number[]): Function;
    method(a: string): Function;
    method(arg0: any, ...arg1?: any[]) {
        throw new Error('Method not implemented.');
    }
`);
