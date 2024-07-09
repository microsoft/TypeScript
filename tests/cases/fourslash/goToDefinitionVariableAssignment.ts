/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true
// @filename: foo.js
////const Bar;
////const Foo = /*def*/Bar = function () {}
////Foo.prototype.bar = function() {}
////new [|Foo/*ref*/|]();

goTo.file("foo.js");
verify.baselineGoToDefinition("ref");
