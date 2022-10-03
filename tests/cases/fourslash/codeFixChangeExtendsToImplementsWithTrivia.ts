/// <reference path='fourslash.ts' />

//// interface I1 { }
//// interface I2 { }
//// interface I3 { }

//// [|class MyClass /*A !*/ //B !
////     /*C !*/ extends /*D !*/ I1 /*E !*/ //F !
////     /*G !*/ implements /*H !*/ I2 /*I !*/, /*J !*/ I3 /*K !*/ //L !|]
//// {
//// }

verify.codeFix({
    description: "Change 'extends' to 'implements'",
    // TODO: GH#18794
    newRangeContent: `class MyClass /*A !*/ //B !
    /*C !*/ implements /*D !*/ I1, /*E !*/ //F !
    /*G !*/ /*H !*/ I2 /*I !*/, /*J !*/ I3 /*K !*/ //L !`,
});
