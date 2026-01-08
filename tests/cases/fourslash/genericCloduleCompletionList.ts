/// <reference path='fourslash.ts'/>

////class D<T> { x: number }
////namespace D { export function f() { } }

////var d: D<number>;
////d./**/

verify.completions({ marker: "", exact: "x" });
