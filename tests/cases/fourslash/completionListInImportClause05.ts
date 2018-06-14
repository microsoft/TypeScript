/// <reference path='fourslash.ts' />

// @Filename: app.ts
////import * as A from "/*1*/";

// @Filename: /node_modules/@types/a__b/index.d.ts
////declare module "@e/f" { function fun(): string; }

// @Filename: /node_modules/@types/c__d/index.d.ts
////export declare let x: number;

// NOTE: The node_modules folder is in "/", rather than ".", because it requires
// less scaffolding to mock.  In particular, "/" is where we look for type roots.

verify.completionsAt("1", ["@e/f", "@a/b", "@c/d"], { isNewIdentifierLocation: true });
