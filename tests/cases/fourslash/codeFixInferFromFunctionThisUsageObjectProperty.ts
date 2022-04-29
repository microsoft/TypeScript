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
//// const container: Container = {
////     member: "sample",
////     returnThisMember: returnThisMember,
//// };
////
//// container.returnThisMember();

verify.rangeAfterCodeFix("this: Container");
