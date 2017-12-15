/// <reference path="fourslash.ts" />

////enum E {}
////class C {}
////abstract class A {}
////const e: E = /*e*/
////const c: C = new /*c*/
////const a: A = new /*a*/

goTo.marker("e");
verify.completionListContains("E", "enum E", "", "enum", undefined, undefined, { isRecommended: true });

goTo.marker("c");
verify.completionListContains("C", "class C", "", "class", undefined, undefined, { isRecommended: true });

goTo.marker("a");
// Not recommended, because it's an abstract class
verify.completionListContains("A", "class A", "", "class");
