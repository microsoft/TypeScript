/// <reference path='fourslash.ts' />

//// interface I1 {
////     x: number;
//// }
//// interface I2 {
////     y: number;
//// }
////
//// class C implements I1,I2 {[|
////     |]y: number;
//// }

verify.codeFix({
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "I1"],
    index: 1,
    applyChanges: true,
    newRangeContent:
`
    x: number;
    `
});

verify.not.codeFixAvailable();
