/// <reference path="fourslash.ts" />

// @module: preserve
// @moduleResolution: bundler

// @Filename: /foo/a.ts
//// export const A = 0;

// @Filename: /foo/b.ts
//// export {};
//// A/*sibling*/

// @Filename: /foo/index.ts
//// export * from "./a";
//// export * from "./b";

// @Filename: /index.ts
//// export * from "./foo";
//// export * from "./src";

// @Filename: /src/a.ts
//// export {};
//// A/*parent*/

// @Filename: /src/index.ts
//// export * from "./a";

// Module specifiers made up of only "." and ".." components are deprioritized
verify.importFixModuleSpecifiers("sibling", ["./a", ".", ".."]);
verify.importFixModuleSpecifiers("parent", ["../foo", "../foo/a", ".."]);