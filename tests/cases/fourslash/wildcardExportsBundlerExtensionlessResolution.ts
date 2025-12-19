/// <reference path="fourslash.ts" />

// @module: preserve
// @moduleResolution: bundler
// @jsx: react

// Test: Verify that extensionless wildcard exports resolve correctly in bundler mode
// and provide proper type information (quickinfo)
// Related: https://github.com/microsoft/TypeScript/issues/62909

// @Filename: /node_modules/@repo/library/package.json
//// {
////   "name": "@repo/library",
////   "exports": {
////     "./*": "./src/*"
////   }
//// }

// @Filename: /node_modules/@repo/library/src/utils.ts
//// export function /*greetDefinition*/greet(): string {
////     return "hello";
//// }

// @Filename: /main.ts
//// import { /*greetImport*/greet } from "@repo/library/utils";
//// /*greetCall*/greet();

verify.quickInfoAt("greetImport", "(alias) function greet(): string\nimport greet");
verify.quickInfoAt("greetCall", "(alias) greet(): string\nimport greet");
