/// <reference path='fourslash.ts' />

////class A {
////    foo() {
////        this._bar();
////    }
////}

verify.codeFixAvailable([
    { description: "Declare private method '_bar'" },
    { description: "Declare method '_bar'" },
    { description: "Declare private property '_bar'" },
    { description: "Declare property '_bar'" },
    { description: "Add index signature for property '_bar'" }
])

verify.codeFix({
    description: [ts.Diagnostics.Declare_private_method_0.message, "_bar"],
    index: 0,
    newFileContent:
`class A {
    foo() {
        this._bar();
    }
    private _bar() {
        throw new Error("Method not implemented.");
    }
}`
});
