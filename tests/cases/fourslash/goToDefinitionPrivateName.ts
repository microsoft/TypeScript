/// <reference path='fourslash.ts' />

//// class A {
////     [|/*pnMethodDecl*/#method|]() { }
////     [|/*pnFieldDecl*/#foo|] = 3;
////     constructor() {
////         this.[|/*pnFieldUse*/#foo|]
////         this.[|/*pnMethodUse*/#method|]
////     }
//// }

verify.goToDefinition({
    pnFieldUse: "pnFieldDecl",
    pnMethodUse: "pnMethodDecl"
});
