/// <reference path='fourslash.ts' />

// @Filename: b.ts
////import /*classAliasDefinition*/defaultExport from "a";


// @Filename: a.ts
/////*classDefinition*/class Class {
////    private f;
////}
////export = Class;

goTo.file("b.ts");

goTo.marker('classAliasDefinition');
goTo.definition();
verify.caretAtMarker('classDefinition');
