/// <reference path='fourslash.ts' />

//// class A {
////     [|/*pnDecl*/#foo|] = 3;
////     constructor() {
////         this.[|/*pnUse*/#foo|]
////     }
//// }

verify.goToDefinition({
    pnUse: "pnDecl",
});
