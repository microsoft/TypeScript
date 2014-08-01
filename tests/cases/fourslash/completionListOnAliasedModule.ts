/// <reference path='fourslash.ts'/>

////module M {
////    export module N {
////        export function foo() { }
////        function bar() { }
////    }
////}
////import p = M.N;
////p./**/

goTo.marker();
verify.completionListContains('foo');
verify.not.completionListContains('bar');