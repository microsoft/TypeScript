/// <reference path='fourslash.ts' />

// @noImplicitThis: true
//// const returnThisMember = function ([| |]) {
////     return this.member;
//// }
////
//// interface Container {
////     member: string;
////     returnThisMember(): string;
//// }
////
//// const container: Container = {
////     member: "sample",
////     returnThisMember: returnThisMember,
//// };

verify.codeFix({
    description: "Infer 'this' type of 'returnThisMember' from usage",
    index: 0,
    newRangeContent: "this: Container ",
});
