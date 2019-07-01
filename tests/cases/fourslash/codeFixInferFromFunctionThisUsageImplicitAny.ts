/// <reference path='fourslash.ts' />

// @noImplicitThis: true
////function returnThisMember([| |]) {
////     return this.member;
//// }
////
//// interface Container {
////     member: string;
////     returnThisMember(): string;
//// }
////
//// let container;
//// container = {
////     member: "sample",
////     returnThisMember: returnThisMember,
//// };
////
//// container.returnThisMember();

verify.codeFix({
    description: "Infer 'this' type of 'returnThisMember' from usage",
    index: 0,
    newRangeContent: "this: { member: string; returnThisMember: () => any; } ",
});
