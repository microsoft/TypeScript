/// <reference path='fourslash.ts'/>

////namespace M {
////    export namespace N {
////        export function foo() { }
////        function bar() { }
////    }
////}
////import p = M.N;
////p./**/

verify.completions({ marker: "", exact: "foo" });
