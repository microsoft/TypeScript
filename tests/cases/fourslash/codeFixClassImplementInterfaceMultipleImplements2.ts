/// <reference path='fourslash.ts' />

//// interface I1 {
////     x: number;
//// }
//// interface I2 {
////     y: "𣋝ઢȴ¬⏊";
//// }
////
//// class C implements I1,I2 {[|
////     |]x: number;
//// }

verify.codeFix({
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "I2"],
    index: 1,
    applyChanges: true,
    newRangeContent:
`
    y: "𣋝ઢȴ¬⏊";
    `
});

verify.not.codeFixAvailable();
