/// <reference path="fourslash.ts" />

// @moduleResolution: hybrid
// @allowImportingTsExtensions: true
// @noEmit: true

// @Filename: /local.ts
//// export const fromLocal: number;

// @Filename: /Component.tsx
//// export function Component() { return null; }

// @Filename: /main.ts
//// import { Component } from "./Component.tsx";
//// /**/

verify.baselineAutoImports("");
