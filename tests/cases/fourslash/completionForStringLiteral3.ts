/// <reference path='fourslash.ts'/>

////declare function f(a: "A", b: number): void;
////declare function f(a: "B", b: number): void;
////declare function f(a: "C", b: number): void;
////declare function f(a: string, b: number): void;
////
////f("[|/*1*/C|]", 2);
////
////f("/*2*/

verify.completions({ marker: "1", exact: [
    { name: "A", replacementSpan: test.ranges()[0] },
    { name: "B", replacementSpan: test.ranges()[0] },
    { name: "C", replacementSpan: test.ranges()[0] }
], isNewIdentifierLocation: true });

verify.completions({ marker: "2", exact: [ "A", "B", "C"], isNewIdentifierLocation: true });