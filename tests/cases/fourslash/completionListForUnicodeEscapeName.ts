/// <reference path='fourslash.ts' />

////function \u0042 () { /*0*/ }
////export default function \u0043 () { /*1*/ }
////class \u0041 { /*2*/ }
/////*3*/

goTo.marker("0");
verify.not.completionListContains("B");
verify.not.completionListContains("\u0042");

goTo.marker("2");
verify.not.completionListContains("C");
verify.not.completionListContains("\u0043");

goTo.marker("2");
verify.not.completionListContains("A");
verify.not.completionListContains("\u0041");

goTo.marker("3");
verify.not.completionListContains("B");
verify.not.completionListContains("\u0042");
verify.not.completionListContains("A");
verify.not.completionListContains("\u0041");
verify.not.completionListContains("C");
verify.not.completionListContains("\u0043");

