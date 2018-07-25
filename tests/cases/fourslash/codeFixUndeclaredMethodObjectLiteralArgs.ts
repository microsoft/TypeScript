/// <reference path='fourslash.ts' />

//// class A {[|
////     |]constructor() {
////         this.foo1(null, {}, { a: 1, b: "2"});
////     }
//// }

verify.codeFix({
    description: "Declare method 'foo1'",
    index: 0,
    newRangeContent: `
    foo1(arg0: null, arg1: {}, arg2: { a: number; b: string; }): any {
        throw new Error("Method not implemented.");
    }
    `
});
