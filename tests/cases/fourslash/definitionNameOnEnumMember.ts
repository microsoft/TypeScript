/// <reference path="fourslash.ts"/>

////enum e {
////    firstMember,
////    secondMember,
////    thirdMember
////}
////var enumMember = e.[|/*1*/thirdMember|];

verify.baselineGetDefinitionAtPosition("1");
