/// <reference path='fourslash.ts' />

// @Filename: b.ts
////export {Class as [|/*classAliasDefinition*/ClassAlias|]} from "./a";


// @Filename: a.ts
////export module Module {
////}
////export class /*classDefinition*/Class {
////    private f;
////}
////export interface Interface {
////    x;
////}

verify.baselineGoToDefinition("classAliasDefinition");
