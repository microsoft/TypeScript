/// <reference path="fourslash.ts"/>

////enum e {
////    firstMember,
////    secondMember,
////    thirdMember
////}
////var enumMember = e./*1*/thirdMember;

goTo.marker("1");
// This is bug #652
verify.verifyDefinitionsName("e.thirdMember", "e");