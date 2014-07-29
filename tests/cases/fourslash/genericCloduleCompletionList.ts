/// <reference path='fourslash.ts'/>

////class D<T> { x: number }
////module D { export function f() { } }

////var d: D<number>;
////d./**/

goTo.marker();
verify.completionListContains('x');
verify.not.completionListContains('f');
