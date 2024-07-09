/// <reference path="fourslash.ts" />

// @module: commonjs

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

verify.importFixModuleSpecifiers("sibling", ["./a", "./index", "../index"], { importModuleSpecifierEnding: "index" });
// Here, "../foo/a" and "../foo/index" actually have the same sorting score,
// so the original program order is preserved, which seems coincidentally probably good?
// In other words, a re-export is preferable only if it saves on directory separators
// and isn't in an ancestor directory of the importing file.
verify.importFixModuleSpecifiers("parent", ["../foo/a", "../foo/index", "../index"], { importModuleSpecifierEnding: "index" });
