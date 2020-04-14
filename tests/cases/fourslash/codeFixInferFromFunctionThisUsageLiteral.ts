/// <reference path='fourslash.ts' />

// @noImplicitThis: true
////function returnThisMember([| |]) {
////     return this.member;
//// }
////
//// const container = {
////     member: "sample",
////     returnThisMember: returnThisMember,
//// };

verify.codeFix({
    description: "Infer 'this' type of 'returnThisMember' from usage",
    index: 0,
    newRangeContent: "this: { member: string; returnThisMember: () => any; } ",
});
