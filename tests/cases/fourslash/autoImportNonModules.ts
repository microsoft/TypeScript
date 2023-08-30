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
//// export function f(){ return false }

verify.completions({
  excludes: ["f"],
  preferences: {
    includeCompletionsForModuleExports: true
  }
});