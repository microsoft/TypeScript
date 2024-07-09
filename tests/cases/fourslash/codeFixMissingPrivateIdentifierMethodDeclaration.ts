/// <reference path='fourslash.ts' />

//// class A {
////     constructor() {
////         this.[|/*pnUse*/#prop|] = 123;
////     }
//// }

verify.codeFix({
    description: "Declare property '#prop'",
    index: 0,
    newFileContent: `class A {
    #prop: number;
    constructor() {
        this.#prop = 123;
    }
}`
});

