/// <reference path='fourslash.ts' />

// @Filename: b.ts
////import [|/*classAliasDefinition*/defaultExport|] from "./a";


// @Filename: a.ts
////class /*classDefinition*/Class {
////    private f;
////}
////export default Class;

verify.baselineGoToDefinition("classAliasDefinition");
