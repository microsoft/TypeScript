/// <reference path='fourslash.ts'/>
// @allowJs: true
// @Filename: in.js
/////** I am documentation
//// * @param {'literal'} p1
//// * @param {"literal"} p2
//// * @param {'other1' | 'other2'} p3
//// * @param {'literal' | number} p4
//// */
////function f(p1, p2, p3, p4) {
////    return p1 + p2 + p3 + p4 + '.';
////}
////f/*1*/('literal', 'literal', "o/*2*/ther1", 12);

goTo.marker('1');
verify.quickInfoExists();
verify.quickInfoIs('function f(p1: "literal", p2: "literal", p3: "other1" | "other2", p4: "literal" | number): string', 'I am documentation');

goTo.marker('2');
verify.completionListContains("other1");
verify.completionListContains("other2");
verify.memberListCount(2);
