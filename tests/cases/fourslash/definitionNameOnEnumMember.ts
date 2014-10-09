/// <reference path="fourslash.ts"/>

////enum e {
////    firstMember,
////    secondMember,
////    thirdMember
////}
////var enumMember = e./*1*/thirdMember;

goTo.marker("1");
verify.verifyDefinitionsName("thirdMember", "e");