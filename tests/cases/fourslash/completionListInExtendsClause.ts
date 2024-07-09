/// <reference path='fourslash.ts' />

////interface IFoo {
////    method();
////}
////
////class Foo {
////    property: number;
////    method() { }
////    static staticMethod() { }
////}
////class test1 extends Foo./*1*/ {}
////class test2 implements IFoo./*2*/ {}
////interface test3 extends IFoo./*3*/ {}
////interface test4 implements Foo./*4*/ {}

verify.completions(
    {
        marker: "1",
        exact: completion.functionMembersPlus([
            { name: "staticMethod", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "prototype", sortText: completion.SortText.LocationPriority },
        ])
    },
    { marker: ["2", "3", "4"], exact: undefined },
);
