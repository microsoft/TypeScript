/// <reference path='fourslash.ts'/>

////function f(/*fnDecl*/this: number) {
////    return [|/*fnUse*/this|];
////}
////class /*cls*/C {
////    constructor() { return [|/*clsUse*/this|]; }
////    get self(/*getterDecl*/this: number) { return [|/*getterUse*/this|]; }
////}

verify.baselineGoToDefinition(
    "fnUse",
    "clsUse",
    "getterUse",
);
