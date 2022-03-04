/// <reference path='fourslash.ts' />

////class ClassStaticBocks {
////    static x;
////    [|/*classStaticBocks1*/static|] {}
////    static y;
////    [|/*classStaticBocks2*/static|] {}
////    static y;
////    [|/*classStaticBocks3*/static|] {}
////}

verify.goToDefinition({
    classStaticBocks1: ["classStaticBocks1", "classStaticBocks2", "classStaticBocks3"],
    classStaticBocks2: ["classStaticBocks1", "classStaticBocks2", "classStaticBocks3"],
    classStaticBocks3: ["classStaticBocks1", "classStaticBocks2", "classStaticBocks3"],
});
