/// <reference path='fourslash.ts'/>

////const a = {
////  b: 42 as /*0*/
////};
////
////1 as /*1*/
////
////const b = 42 as /*2*/
////
////var c = </*3*/>42

verify.completions({ marker: test.markers(), exact: completion.typeAssertionKeywords });
