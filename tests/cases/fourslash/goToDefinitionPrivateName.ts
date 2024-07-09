/// <reference path='fourslash.ts' />

//// class A {
////     [|/*pnMethodDecl*/#method|]() { }
////     [|/*pnFieldDecl*/#foo|] = 3;
////     get [|/*pnPropGetDecl*/#prop|]() { return ""; }
////     set [|/*pnPropSetDecl*/#prop|](value: string) {  }
////     constructor() {
////         this.[|/*pnFieldUse*/#foo|]
////         this.[|/*pnMethodUse*/#method|]
////         this.[|/*pnPropUse*/#prop|]
////     }
//// }

verify.baselineGoToDefinition(
    "pnFieldUse",
    "pnMethodUse",
    "pnPropUse",
);
