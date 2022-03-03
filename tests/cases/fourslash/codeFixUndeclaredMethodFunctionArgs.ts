/// <reference path='fourslash.ts' />

//// class A {
////     constructor() {
////         this.foo1(() => 1, () => "2", () => false);
////         this.foo2((a: number) => a, (b: string) => b, (c: boolean) => c);
////     }[|
////     |]
//// }

verify.codeFix({
    description: "Declare method 'foo1'",
    index: 0,
    newRangeContent: `
    foo1(arg0: () => number, arg1: () => string, arg2: () => boolean) {
        throw new Error("Method not implemented.");
    }
    `,
    applyChanges: true,
});

verify.codeFix({
    description: "Declare method 'foo2'",
    index: 0,
    newRangeContent: `
    foo2(arg0: (a: number) => number, arg1: (b: string) => string, arg2: (c: boolean) => boolean) {
        throw new Error("Method not implemented.");
    }
    foo1(arg0: () => number, arg1: () => string, arg2: () => boolean) {
        throw new Error("Method not implemented.");
    }
    `,
});
