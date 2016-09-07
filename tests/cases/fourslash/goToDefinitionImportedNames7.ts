/// <reference path='fourslash.ts' />

// @Filename: b.ts
////import /*classAliasDefinition*/defaultExport from "./a";


// @Filename: a.ts
/////*classDefinition*/class Class {
////    private f;
////}
////export default Class;

verify.goToDefinition("classAliasDefinition", "classDefinition");
