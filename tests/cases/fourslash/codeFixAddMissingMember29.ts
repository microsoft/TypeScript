/// <reference path='fourslash.ts' />

////class C {
////    constructor() {
////        this.#foo();
////    }
////}

verify.codeFix({
    description: [ts.Diagnostics.Declare_method_0.message, "#foo"],
    index: 0,
    newFileContent:
`class C {
    constructor() {
        this.#foo();
    }
    #foo() {
        throw new Error("Method not implemented.");
    }
}`,
});
