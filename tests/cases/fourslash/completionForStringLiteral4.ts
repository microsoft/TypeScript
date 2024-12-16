/// <reference path='fourslash.ts'/>
// @allowJs: true
// @Filename: in.js
/////** I am documentation
//// * @param {'literal'} p1
//// * @param {"literal"} p2
//// * @param {'other1' | 'other2'} p3
//// * @param {'literal' | number} p4
//// * @param {12 | true} p5
//// */
////function f(p1, p2, p3, p4, p5) {
////    return p1 + p2 + p3 + p4 + p5 + '.';
////}
////f/*1*/('literal', 'literal', "[|o/*2*/ther1|]", 12);

goTo.marker('1');
verify.quickInfoExists();
verify.quickInfoIs('function f(p1: "literal", p2: "literal", p3: "other1" | "other2", p4: "literal" | number, p5: 12 | true): string', 'I am documentation');

const replacementSpan = test.ranges()[0]
verify.completions({ marker: "2", exact: [
    { name: "other1", replacementSpan },
    { name: "other2", replacementSpan }
] });
