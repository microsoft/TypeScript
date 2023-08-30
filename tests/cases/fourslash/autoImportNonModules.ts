/// <reference path="fourslash.ts" />

// @Filename: /tsconfig.json
//// {
////  "compilerOptions": {
////    "module": "none"
////  }
////}

// @Filename: /src/dirA/index.ts
//// export * from "./thing1A";

// @Filename: /src/dirA/thing1A.ts
//// export class Thing1A {}
//// Thing/**/

verify.completions({
  marker: "",
  includes: ["!Thing1A"],
  preferences: {
    includeCompletionsForModuleExports: true
  }
});