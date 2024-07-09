/// <reference path='fourslash.ts' />

//// interface I1 { }
//// interface I2 { }

//// [|abstract class A extends I1 implements I2|] { }

verify.codeFix({
    description: "Change 'extends' to 'implements'",
    // TODO: GH#18794
    newRangeContent: "abstract class A implements I1, I2",
});
