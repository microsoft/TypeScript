/// <reference path="fourslash.ts"/>

////class Foo {
////    doStuff(): number { return 0; }
////    static staticMethod() {}
////}
////module Foo {
////    export var x: number;
////}
////Foo/*c1*/; // should get "x", "prototype"
////var s: Foo/*c2*/; // no types, in Foo, so shouldnt have anything
////var f = new Foo();
////f/*c3*/;

goTo.marker("c1");
edit.insert(".");
verify.completions({
    includes: [
        { name: "x", sortText: completion.SortText.LocationPriority },
        { name: "prototype", sortText: completion.SortText.LocationPriority },
        { name: "staticMethod", sortText: completion.SortText.LocalDeclarationPriority }
    ]
});

goTo.marker("c2");
edit.insert(".");
verify.completions({ exact: undefined });

goTo.marker("c3");
edit.insert(".");
verify.completions({ exact: "doStuff" });
