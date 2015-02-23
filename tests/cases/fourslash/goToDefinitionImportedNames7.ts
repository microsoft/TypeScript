/// <reference path='fourslash.ts' />

// @Filename: b.ts
////import /*classAliasDefinition*/defaultExport from "myLib";


// @Filename: a.ts
////module Module {
////}
/////*classDefinition*/class Class {
////    private f;
////}
////export = Class;

goTo.file("b.ts");

goTo.marker('classAliasDefinition');
goTo.definition();
verify.caretAtMarker('classDefinition');
