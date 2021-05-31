// #37833

/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /test.js
////class Abcde {
////    x
////}
////
////module.exports = {
////    Abcde
////};

// @Filename: /index.ts
////export {};
////declare module "./test" {
////    interface Abcde { b: string }
////}
////
////Abcde/**/

verify.applyCodeActionFromCompletion("", {
  name: "Abcde",
  source: "/test",
  description: `Import 'Abcde' from module "./test"`,
  newFileContent: `import { Abcde } from "./test";

export {};
declare module "./test" {
    interface Abcde { b: string }
}

Abcde`,
  preferences: {
    includeCompletionsForModuleExports: true
  }
});
