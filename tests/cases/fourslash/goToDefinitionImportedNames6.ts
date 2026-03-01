/// <reference path='fourslash.ts' />

// @Filename: b.ts
////import [|/*moduleAliasDefinition*/alias|] = require("./a");


// @Filename: a.ts
/////*moduleDefinition*/export namespace Module {
////}
////export class Class {
////    private f;
////}
////export interface Interface {
////    x;
////}

verify.baselineGoToDefinition("moduleAliasDefinition");
