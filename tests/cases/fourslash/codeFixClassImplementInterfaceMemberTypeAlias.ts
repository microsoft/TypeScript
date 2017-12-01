/// <reference path='fourslash.ts' />

//// type MyType = [string, number];
//// interface I { x: MyType; test(a: MyType): void; }
//// class C implements I {[| |]}

verify.rangeAfterCodeFix(`
    x: [string, number];
    test(a: [string, number]): void {
        throw new Error("Method not implemented.");
    }
`);
