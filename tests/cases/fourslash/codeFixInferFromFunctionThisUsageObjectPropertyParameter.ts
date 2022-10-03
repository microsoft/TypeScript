/// <reference path='fourslash.ts' />

// @noImplicitThis: true
////function returnThisMember([| |]suffix: string) {
////     return this.member + suffix;
//// }
////
//// interface Container {
////     member: string;
////     returnThisMember(suffix: string): string;
//// }
////
//// const container: Container = {
////     member: "sample",
////     returnThisMember: returnThisMember,
//// };
////
//// container.returnThisMember("");

verify.rangeAfterCodeFix("this: Container, ");
