/// <reference path="fourslash.ts" />

// @Filename: /tsconfig.json
//// {
////  "compilerOptions": {
////    "module": "none",
////  }
////}

// @Filename: /src/dirA/index.ts
//// export * from "./thing1A";
//// export * from "./thing2A";

// @Filename: /src/dirA/thing1A.ts
//// export class Thing1A {}
//// Thing/**/

// @Filename: /src/dirA/thing2A.ts
//// export class Thing2A {}

verify.completions({
  marker: "",
  excludes: ["Thing2A"],
  preferences: {
    includeCompletionsForModuleExports: false
  }
});