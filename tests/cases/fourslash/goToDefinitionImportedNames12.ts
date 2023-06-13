/// <reference path='fourslash.ts' />

// @Filename: e.ts
//// import { c } from "./d";
//// /*ref1*/c;


// @Filename: d.ts
////export * from "./c";


// @Filename: c.ts
////export { /*ref2*/" b " as /*ref3*/c } from "./b";


// @Filename: b.ts
////export * from "./a";


// @Filename: a.ts
////const a = /*varDefinition*/1;
////export { /*ref4*/a as /*ref5*/" b " };

verify.baselineGoToDefinition('ref1', 'ref2', 'ref3', 'ref4', 'ref5')
