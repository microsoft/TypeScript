/// <reference path="./fourslash.ts"/>

// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noImplicitOverride: true
// @filename: a.js

////class Foo {}
////class Bar extends Foo {
////    /** [|@override{|"name": "1"|} |]*/
////    m() {}
////}

verify.baselineGoToDefinition("1");
