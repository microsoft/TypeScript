/// <reference path='fourslash.ts' />

//// interface I {
////     ["foo"](o: any): boolean;
////     ["x"]: boolean;
////     [1](): string;
////     [2]: boolean;
//// }
////
//// class C implements I {[|  |]}

verify.rangeAfterCodeFix(`
    [1](): string {
        throw new Error('Method not implemented.');
    }
    [2]: boolean;
    ["foo"](o: any): boolean {
        throw new Error('Method not implemented.');
    }
    ["x"]: boolean;
`);