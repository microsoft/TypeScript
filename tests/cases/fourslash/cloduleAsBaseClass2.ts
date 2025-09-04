/// <reference path='fourslash.ts'/>

// @Filename: cloduleAsBaseClass2_0.ts
////class A {
////    constructor(x: number) { }
////    foo() { }
////    static bar() { }
////}
////
////namespace A {
////    export var x = 1;
////    export function baz() { }
////}
////
////export = A;

// @Filename: cloduleAsBaseClass2_1.ts
////import B = require('./cloduleAsBaseClass2_0');
////class D extends B {
////    constructor() {
////        super(1);
////    }
////    foo2() { }
////    static bar2() { }
////}
////
////var d: D;
////d./*1*/
////D./*2*/

verify.completions({ marker: "1", exact: ["foo", "foo2"] });
edit.insert('foo()');

verify.completions({
    marker: "2",
    includes: [
        { name: "bar", sortText: completion.SortText.LocalDeclarationPriority },
        { name: "bar2", sortText: completion.SortText.LocalDeclarationPriority },
        { name: "baz", sortText: completion.SortText.LocationPriority },
        { name: "x", sortText: completion.SortText.LocationPriority }
    ],
    excludes: ["foo", "foo2"]
});
edit.insert('bar()');

verify.noErrors();
