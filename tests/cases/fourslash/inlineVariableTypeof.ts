/// <reference path="fourslash.ts" />

////const Foo/**/ = class Foo {}
////type FooConstructor = typeof Foo;

goTo.marker("");
verify.not.refactorAvailable("Inline variable");