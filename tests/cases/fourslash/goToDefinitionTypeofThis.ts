/// <reference path='fourslash.ts'/>

////function f(/*fnDecl*/this: number) {
////    type X = typeof [|/*fnUse*/this|];
////}
////class /*cls*/C {
////    constructor() { type X = typeof [|/*clsUse*/this|]; }
////    get self(/*getterDecl*/this: number) { type X = typeof [|/*getterUse*/this|]; }
////}

verify.goToDefinition({
    "fnUse": "fnDecl",
    "clsUse": "cls",
    "getterUse": "getterDecl"
});
