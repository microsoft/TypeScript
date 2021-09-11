/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /node_modules/@types/node/index.d.ts
//// declare module "path" { function join(...segments: readonly string[]): string; }
//// declare module "node:path" { export * from "path"; }
//// declare module "fs" { function writeFile(): void }
//// declare module "fs/promises" { function writeFile(): Promise<void> }
//// declare module "node:fs" { export * from "fs"; }
//// declare module "node:fs/promises" { export * from "fs/promises"; }

// @Filename: /other.ts
//// import "node:fs/promises";

// @Filename: /noPrefix.ts
//// import "path";
//// writeFile/*noPrefix*/

// @Filename: /prefix.ts
//// import "node:path";
//// writeFile/*prefix*/

// @Filename: /mixed1.ts
//// import "path";
//// import "node:path";
//// writeFile/*mixed1*/

// @Filename: /mixed2.ts
//// import "node:path";
//// import "path";
//// writeFile/*mixed2*/

verify.importFixModuleSpecifiers("noPrefix", ["fs", "fs/promises", "node:fs", "node:fs/promises"]);
verify.importFixModuleSpecifiers("prefix", ["node:fs", "node:fs/promises", "fs", "fs/promises"]);

// We're doing as little work as possible to decide which module specifiers
// to use, so we just take the *first* recognized node core module in the file
// and copy its style.

verify.importFixModuleSpecifiers("mixed1", ["fs", "fs/promises", "node:fs", "node:fs/promises"]);
verify.importFixModuleSpecifiers("mixed2", ["node:fs", "node:fs/promises", "fs", "fs/promises"]);