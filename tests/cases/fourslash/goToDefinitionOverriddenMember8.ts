/// <reference path="./fourslash.ts"/>

// @noImplicitOverride: true

// @Filename: ./a.ts
////export class A {
////    /*2*/m() {}
////}

// @Filename: ./b.ts
////import { A } from "./a";
////class B extends A {
////    [|/*1*/override|] m() {}
////}

verify.baselineGoToDefinition("1");
