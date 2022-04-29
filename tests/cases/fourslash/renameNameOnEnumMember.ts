/// <reference path="fourslash.ts"/>

////enum e {
////    firstMember,
////    secondMember,
////    thirdMember
////}
////var enumMember = e.[|/**/thirdMember|];

goTo.marker("");
verify.renameInfoSucceeded("thirdMember", "e.thirdMember");