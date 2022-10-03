/// <reference path='fourslash.ts'/>

////declare class A {
////    static foo;
////}
////declare class B extends A {
////    static bar;
////}
////declare class C extends B {
////    static baz;
////}
////
////C./*1*/
////B./*2*/
////A./*3*/

goTo.eachMarker((_, i) => {
    const all = [
        { name: "foo", sortText: completion.SortText.LocalDeclarationPriority },
        { name: "bar", sortText: completion.SortText.LocalDeclarationPriority },
        { name: "baz", sortText: completion.SortText.LocalDeclarationPriority }
    ];
    verify.completions({ includes: all.slice(0, 3 - i), excludes: all.slice(3 - i).map(e => e.name) });
    edit.insert("foo;");
});

verify.noErrors();
