/// <reference path="fourslash.ts" />

// @moduleResolution: bundler
// @allowImportingTsExtensions: true
// @noEmit: true

// @Filename: /local.ts
//// export const fromLocal: number;

// @Filename: /decl.d.ts
//// export const fromDecl: number;

// @Filename: /Component.tsx
//// export function Component() { return null; }

// @Filename: /main.ts
//// import { Component } from "./local.js";
//// /**/

verify.baselineAutoImports("");
