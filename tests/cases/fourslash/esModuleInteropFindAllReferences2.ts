/// <reference path="fourslash.ts"/>

// Tests that we don't always add an indirect user, which causes problems if the module is already available globally.

// @esModuleInterop: true

// @Filename: /a.d.ts
////export as namespace abc;
////export const [|{| "isWriteAccess": true, "isDefinition": true |}x|]: number;

// @Filename: /b.ts
////import a from "./a";
////a.[|x|];

verify.singleReferenceGroup('const x: number');
