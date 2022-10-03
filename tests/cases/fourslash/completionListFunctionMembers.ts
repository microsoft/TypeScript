/// <reference path='fourslash.ts'/>

////function fnc1() {
////    var bar = 1;
////    function foob(){ }
////}
////
////fnc1./**/

verify.completions({ marker: "", exact: completion.functionMembersWithPrototype });
