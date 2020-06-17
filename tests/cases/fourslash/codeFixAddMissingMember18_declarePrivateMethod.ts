/// <reference path='fourslash.ts' />

////class A {
////    constructor() {
////        this._foo();
////    }
////}

verify.codeFixAvailable([
    { description: "Declare private method '_foo'" },
    { description: "Declare method '_foo'" },
    { description: "Declare private property '_foo'" },
    { description: "Declare property '_foo'" },
    { description: "Add index signature for property '_foo'" }
])

verify.codeFix({
    description: [ts.Diagnostics.Declare_private_method_0.message, "_foo"],
    index: 0,
    newFileContent:
`class A {
    constructor() {
        this._foo();
    }
    private _foo() {
        throw new Error("Method not implemented.");
    }
}`
});
