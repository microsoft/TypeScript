/// <reference path='fourslash.ts' />

// @Filename: b.ts
////import {[|/*classAliasDefinition*/Class|]} from "./a";


// @Filename: a.ts
////export namespace Module {
////}
////export class /*classDefinition*/Class {
////    private f;
////}
////export interface Interface {
////    x;
////}

verify.baselineGoToDefinition("classAliasDefinition");
