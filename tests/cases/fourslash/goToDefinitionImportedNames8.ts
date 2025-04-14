/// <reference path='fourslash.ts' />
// @allowjs: true

// @Filename: b.js
////import { [|/*classAliasDefinition*/Class|] } from "./a";


// @Filename: a.js
////class /*classDefinition*/Class {
////    private f;
////}
//// export { Class };

verify.baselineGoToDefinition("classAliasDefinition");
