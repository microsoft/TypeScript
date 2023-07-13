/// <reference path="fourslash.ts" />

////const /*a*/Foo/*b*/ = class Foo {}
////type FooConstructor = typeof Foo;

goTo.select("a", "b");
verify.not.refactorAvailable("Inline variable");