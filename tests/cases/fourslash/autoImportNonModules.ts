/// <reference path="fourslash.ts" />

// @module: none

// @Filename: /src/dirA/index.ts
//// export * from "./thing1A";

// @Filename: /src/dirA/thing1A.ts
//// export function f() { return true }

verify.completions({
  includes: [],
});
