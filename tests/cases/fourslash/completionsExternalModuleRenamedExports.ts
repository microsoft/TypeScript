/// <reference path="fourslash.ts" />

// @Filename: other.ts
//// export {};

// @Filename: index.ts
//// const c = 0;
//// export { c as yeahThisIsTotallyInScopeHuh };
//// export * as alsoNotInScope from "./other";
//// 
//// /**/

verify.completions({
  marker: "",
  includes: "c",
  excludes: ["yeahThisIsTotallyInScopeHuh", "alsoNotInScope"],
});
