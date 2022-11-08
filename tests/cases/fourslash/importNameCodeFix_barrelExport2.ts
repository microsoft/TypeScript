/// <reference path="fourslash.ts" />

// @module: commonjs
// @baseUrl: /

// @Filename: /proj/foo/a.ts
//// export const A = 0;

// @Filename: /proj/foo/b.ts
//// export {};
//// A/*sibling*/

// @Filename: /proj/foo/index.ts
//// export * from "./a";
//// export * from "./b";

// @Filename: /proj/index.ts
//// export * from "./foo";
//// export * from "./src";

// @Filename: /proj/src/a.ts
//// export {};
//// A/*parent*/

// @Filename: /proj/src/utils.ts
//// export function util() { return "util"; }
//// export { A } from "../foo/a";

// @Filename: /proj/src/index.ts
//// export * from "./a";

verify.importFixModuleSpecifiers("sibling", ["proj/foo/a", "proj/src/utils", "proj", "proj/foo"], { importModuleSpecifierPreference: "non-relative" });
verify.importFixModuleSpecifiers("parent", ["proj/foo", "proj/foo/a", "proj/src/utils", "proj"], { importModuleSpecifierPreference: "non-relative" });
