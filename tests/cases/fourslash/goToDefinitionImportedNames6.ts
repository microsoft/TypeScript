/// <reference path='fourslash.ts' />

// @Filename: b.ts
////import /*moduleAliasDefinition*/alias = require("a");


// @Filename: a.ts
/////*moduleDefinition*/export module Module {
////}
////export class Class {
////    private f;
////}
////export interface Interface {
////    x;
////}

goTo.file("b.ts");

goTo.marker('moduleAliasDefinition');
goTo.definition();
verify.caretAtMarker('moduleDefinition');
