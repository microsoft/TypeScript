/// <reference path='fourslash.ts' />

// @Filename: e.ts
//// import {M, [|/*classAliasDefinition*/C|], I} from "./d";
//// var c = new [|/*classReference*/C|]();


// @Filename: d.ts
////export * from "./c";


// @Filename: c.ts
////export {Module as M, Class as C, Interface as I} from "./b";


// @Filename: b.ts
////export * from "./a";


// @Filename: a.ts
////export module Module {
////}
////export class /*classDefinition*/Class {
////    private f;
////}
////export interface Interface {
////    x;
////}

verify.baselineGoToDefinition("classReference", "classAliasDefinition");
