/// <reference path="../fourslash.ts"/>

////interface Foo {
////    /** Doc */
////    bar: number;
////}
////
////const f: Foo = { bar: 0 };
////f./*f*/bar;
////
////const f2: { [TKey in keyof Foo]: string } = { bar: "0" };
////f2./*f2*/bar;
////
////const f3 = { ...f };
////f3./*f3*/bar;
////
////const f4 = { ...f2 };
////f4./*f4*/bar;

goTo.marker("f");
verify.quickInfoIs("(property) Foo.bar: number", "Doc ");

goTo.marker("f2");
verify.quickInfoIs("(property) bar: string", "Doc ");

goTo.marker("f3");
verify.quickInfoIs("(property) Foo.bar: number", "Doc ");

goTo.marker("f4");
verify.quickInfoIs("(property) bar: string", "Doc ");
