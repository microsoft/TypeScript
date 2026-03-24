/// <reference path="fourslash.ts" />

// @module: node18

// @Filename: /package.json
//// { "type": "module" }

// @Filename: /foo/a.ts
//// export const A = 0;

// @Filename: /foo/b.ts
//// export {};
//// A/*sibling*/

// @Filename: /foo/index.ts
//// export * from "./a.js";
//// export * from "./b.js";

// @Filename: /index.ts
//// export * from "./foo/index.js";
//// export * from "./src/index.js";

// @Filename: /src/a.ts
//// export {};
//// A/*parent*/

// @Filename: /src/index.ts
//// export * from "./a.js";

verify.importFixModuleSpecifiers("sibling", ["./a.js", "./index.js", "../index.js"]);
verify.importFixModuleSpecifiers("parent", ["../foo/a.js", "../foo/index.js", "../index.js"]);