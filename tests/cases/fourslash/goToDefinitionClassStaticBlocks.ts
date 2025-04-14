/// <reference path='fourslash.ts' />

////class ClassStaticBocks {
////    static x;
////    [|/*classStaticBocks1*/static|] {}
////    static y;
////    [|/*classStaticBocks2*/static|] {}
////    static y;
////    [|/*classStaticBocks3*/static|] {}
////}

verify.baselineGoToDefinition(
    "classStaticBocks1",
    "classStaticBocks2",
    "classStaticBocks3",
);
