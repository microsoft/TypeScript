/// <reference path='fourslash.ts' />

//// interface I1 { }
//// interface I2 { }

//// function sealed(constructor: Function) {
////     Object.seal(constructor);
////     Object.seal(constructor.prototype);
//// }

//// @sealed
//// [|class A extends I1 implements I2 { }|]
verify.codeFix({
    description: "Change 'extends' to 'implements'",
    // TODO: GH#18794
    newRangeContent: "class A implements I1, I2 { }",
});
