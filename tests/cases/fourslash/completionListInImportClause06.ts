/// <reference path='fourslash.ts' />

// @typeRoots: T1,T2

// @Filename: app.ts
////import * as A from "/*1*/";

// @Filename: T1/a__b/index.d.ts
////export declare let x: number;

// @Filename: T2/a__b/index.d.ts
////export declare let x: number;

// Confirm that entries are de-dup'd.
verify.completionsAt("1", ["@a/b"], { isNewIdentifierLocation: true });
