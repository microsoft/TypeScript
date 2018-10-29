/// <reference path='fourslash.ts'/>

////module M {
////    export module N {
////        export function foo() { }
////        function bar() { }
////    }
////}
////import p = M.N;
////p./**/

verify.completions({ marker: "", exact: "foo" });
