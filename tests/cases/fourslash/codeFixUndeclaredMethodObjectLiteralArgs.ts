/// <reference path='fourslash.ts' />

//// class A {
////     constructor() {
////         this.foo1(null, {}, { a: 1, b: "2"});
////         const bar = this.foo2(null, {}, { a: 1, b: "2"});
////         const baz: number = this.foo3(null, {}, { a: 1, b: "2"});
////     }[|
////     |]
//// }

verify.codeFix({
    description: "Declare method 'foo1'",
    index: 0,
    newRangeContent: `
    foo1(arg0: null, arg1: {}, arg2: { a: number; b: string; }) {
        throw new Error("Method not implemented.");
    }
    `,
    applyChanges: true
});

verify.codeFix({
    description: "Declare method 'foo2'",
    index: 0,
    newRangeContent: `
    foo2(arg0: null, arg1: {}, arg2: { a: number; b: string; }) {
        throw new Error("Method not implemented.");
    }
    foo1(arg0: null, arg1: {}, arg2: { a: number; b: string; }) {
        throw new Error("Method not implemented.");
    }
    `,
    applyChanges: true
});

verify.codeFix({
    description: "Declare method 'foo3'",
    index: 0,
    newRangeContent: `
    foo3(arg0: null, arg1: {}, arg2: { a: number; b: string; }): number {
        throw new Error("Method not implemented.");
    }
    foo2(arg0: null, arg1: {}, arg2: { a: number; b: string; }) {
        throw new Error("Method not implemented.");
    }
    foo1(arg0: null, arg1: {}, arg2: { a: number; b: string; }) {
        throw new Error("Method not implemented.");
    }
    `
});
