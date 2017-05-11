/// <reference path='fourslash.ts' />

//// type MyType = [string, number];
//// interface I { test(a: MyType): void; }
//// class C implements I {[| |]}

verify.rangeAfterCodeFix(`
    test(a: [string, number]): void {
        throw new Error("Method not implemented.");
    }
`);

