/// <reference path='fourslash.ts'/>

////class A {
////    constructor(x: number) { }
////    foo() { }
////    static bar() { }
////}
////
////module A {
////    export var x = 1;
////    export function baz() { }
////}
////
////class D extends A {
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

verify.completions({ marker: "1", exact: ["foo2", "foo"] });
edit.insert('foo()');
verify.completions({
    marker: "2",
    exact: [
        { name: "prototype", sortText: completion.SortText.LocationPriority },
        { name: "bar2", sortText: completion.SortText.LocalDeclarationPriority },
        { name: "bar", sortText: completion.SortText.LocalDeclarationPriority },
        { name: "baz", sortText: completion.SortText.LocationPriority },
        { name: "x", sortText: completion.SortText.LocationPriority },
        ...completion.functionMembers
    ]
});
edit.insert('bar()');
verify.noErrors();
