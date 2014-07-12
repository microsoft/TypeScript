/// <reference path="fourslash.ts"/>

////class Base {
////}
////class Derived extends Base {
////}
////interface I1<T extends Base>{
////}
////var x1: I1<Deri/**/>;

goTo.marker();
verify.completionListContains("Derived");
