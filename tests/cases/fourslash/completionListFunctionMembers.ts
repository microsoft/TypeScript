/// <reference path='fourslash.ts'/>

// @lib: es5

////function fnc1() {
////    var bar = 1;
////    function foob(){ }
////}
////
////fnc1./**/

verify.completions({ marker: "", exact: completion.functionMembersWithPrototype });
