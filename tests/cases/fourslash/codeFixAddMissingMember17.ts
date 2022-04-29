/// <reference path='fourslash.ts' />

////class A {
////    constructor() {
////        this._x = 10;
////    }
////}

verify.codeFixAvailable([
    { description: "Declare private property '_x'" },
    { description: "Declare property '_x'" },
    { description: "Add index signature for property '_x'" }
])

verify.codeFix({
    description: [ts.Diagnostics.Declare_private_property_0.message, "_x"],
    index: 0,
    newFileContent:
`class A {
    private _x: number;
    constructor() {
        this._x = 10;
    }
}`
});
